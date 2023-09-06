<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.net.URLEncoder" %>
<%@ page import="java.io.*" %>
<%@ page import="ua_parser.Parser" %>
<%@ page import="ua_parser.Client" %>
<%@ page import="org.springframework.util.FileCopyUtils" %>
<%@ page import="egovframework.com.cmm.util.EgovResourceCloseHelper" %>
<%@ page import="kr.co.hanshinit.NeoCMS.cmm.util.ClientInfo" %>
<%!

    public static String pathFilter(String path) {
        if( null == path ) {
            return "";
        }
        path = path.replaceAll("\\.{1,2}[/\\\\]", "");
        return path;
    }

    public void printError(HttpServletResponse response) throws IOException {

        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html");
        PrintWriter printwriter = response.getWriter();
        printwriter.println("<!DOCTYPE html>");
        printwriter.println("<html lang=\"ko\">");
        printwriter.println("<head>");
        printwriter.println("<meta charset=\"utf-8\" />");
        printwriter.println("<meta http-equiv=\"X-UA-Compatible\" content=\"IE=Edge\" />");
        printwriter.println("<title>오류메시지</title>");
        printwriter.println("</head>");
        printwriter.println("<body>");
        printwriter.println("<script>");
        printwriter.println("alert(\"첨부파일이 존재하지 않습니다.\");");
        //printwriter.println("window.history.back();");
        printwriter.println("</script>");
        printwriter.println("</body>");
        printwriter.println("</html>");
        printwriter.flush();
        printwriter.close();

    }

    private String getBrowser(HttpServletRequest request) throws Exception {
        String header = request.getHeader("User-Agent");
        Parser parser = new Parser();
        Client client = parser.parse(header);
        return ClientInfo.getBrwsr(client);
    }

    private void setDisposition(String filename, HttpServletRequest request, HttpServletResponse response) throws Exception {

        String browser = getBrowser(request);
        String dispositionPrefix = "attachment; filename=";
        String encodedFilename = null;

        if( browser.equals("IE") ) {
            encodedFilename = java.net.URLEncoder.encode(filename,"UTF-8").replace("+", " ");
        } else if( browser.equals("Firefox") || browser.equals("Safari") || browser.equals("Opera") ) {
            encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
        } else if( browser.equals("Chrome") ) {
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < filename.length(); i++) {
                char c = filename.charAt(i);
                if (c > '~') {
                    sb.append(URLEncoder.encode("" + c, "UTF-8"));
                } else {
                    sb.append(c);
                }
            }
            encodedFilename = "\"" + sb.toString() + "\"";
        } else {
            encodedFilename = filename;
        }
        response.setHeader("Content-Disposition", dispositionPrefix + encodedFilename);

    }

%>
<%

    String saveFile = request.getParameter("saveFile");
    String downName = request.getParameter("downName");

    if( null == saveFile || null == downName ) {
        printError(response);
        return;
    }

    saveFile = pathFilter(saveFile);
    saveFile = "/DATA/download" + saveFile;
    saveFile = request.getRealPath(saveFile);
    downName = pathFilter(downName);

    File file = new File(saveFile);
    if( !file.exists() ) {
        printError(response);
        return;
    }

    int fileSize = (int)file.length();
    if( 0 >= fileSize ) {
        printError(response);
        return;
    }

    String mimetype = "application/octet-stream";
    response.setContentType(mimetype);
    response.setContentLength(fileSize);
    setDisposition(downName, request, response);

    BufferedInputStream inputStream = null;
    BufferedOutputStream outputStream = null;
    try {
        inputStream = new BufferedInputStream(new FileInputStream(file));
        outputStream = new BufferedOutputStream(response.getOutputStream());
        FileCopyUtils.copy(inputStream, outputStream);
        out.flush();
    } catch(FileNotFoundException e) {
        printError(response);
        return;
    } catch(IOException e) {
        printError(response);
        return;
    } finally {
        EgovResourceCloseHelper.close(inputStream, outputStream);
    }

%>
