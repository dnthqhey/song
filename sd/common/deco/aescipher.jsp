<%@ page import="javax.crypto.Cipher"%>
<%@ page import="javax.crypto.spec.IvParameterSpec"%>
<%@ page import="javax.crypto.spec.SecretKeySpec"%>
<%!
String keyString = "sdg_data_trs____";
String initialVectorParam = "sdg_data_ivp____";

String encrypt(String str, String encoding) throws Exception {
    String returnVal = "";
    try {
        SecretKeySpec key = new SecretKeySpec(keyString.getBytes(), "AES");
        IvParameterSpec initalVector = new IvParameterSpec(initialVectorParam.getBytes());
        Cipher cipher = Cipher.getInstance("AES/CFB8/NoPadding");

        // ///////////// encrypt /////////////////
        cipher.init(Cipher.ENCRYPT_MODE, key, initalVector);
        byte[] test = cipher.doFinal(str.getBytes(encoding));
        returnVal = bytes2Hex(test);
    } catch(Exception e) {
        e.printStackTrace();
    }
    return returnVal;
}

String decrypt(String str, String encoding) throws Exception {
    String returnVal = "";
    try {
        SecretKeySpec key = new SecretKeySpec(keyString.getBytes(), "AES");
        IvParameterSpec initalVector = new IvParameterSpec(initialVectorParam.getBytes());
        Cipher cipher = Cipher.getInstance("AES/CFB8/NoPadding");

        // ///////////// decrypt /////////////////
        cipher.init(Cipher.DECRYPT_MODE, key, initalVector);
        byte[] encrypted = hex2byte(str);
        byte[] decryptedValue = cipher.doFinal(encrypted);
        returnVal = new String(decryptedValue, encoding);
    } catch(Exception e) {
        e.printStackTrace();
    }
    return returnVal;
}

static byte[] hex2byte(String s) {
    if(s == null) return null;
    int l = s.length();
    if(l % 2 == 1) return null;
    byte[] b = new byte[l / 2];
    for(int i = 0; i < l / 2; i++) {
        b[i] = (byte)Integer.parseInt(s.substring(i * 2, i * 2 + 2), 16);
    }
    return b;
}

static String byte2Hex(byte b) {
    String[] HEX_DIGITS = {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"};
    int nb = b & 0xFF;
    int i_1 = (nb >> 4) & 0xF;
    int i_2 = nb & 0xF;
    return HEX_DIGITS[i_1] + HEX_DIGITS[i_2];
}

static String bytes2Hex(byte[] b) {
    StringBuffer sb = new StringBuffer(b.length * 2);
    for(int x = 0; x < b.length; x++) {
        sb.append(byte2Hex(b[x]));
    }
    return sb.toString();
}
%>