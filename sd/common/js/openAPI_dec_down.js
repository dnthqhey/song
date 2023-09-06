(function() {
    function _openAPI() {
        'use strict';
        var api = {};
        api['version'] = '1.0';
        api['status'] = 'success';
        var defaultDt = function() {
            var dd = new Date();
            var to = dd.getFullYear() + '.' + (dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1) + '.' + (dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate());
            dd.setMonth(dd.getMonth() - 3);
            var from = dd.getFullYear() + '.' + (dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1) + '.' + (dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate());
            return {
                from: from,
                to: to
            }
        };
        var config = {
            'collection': 'PDINFOLIST',
            'index': 'PDINFOLIST_@yyyy_Q@',
            'keyword': '',
            'date': {
                'period': '',
                'field': 'REGDATE',
                'from': defaultDt().from,
                'to': defaultDt().to
            },
            'sort': [{
                'field': 'REGDATE',
                'asc': 'false'
            }, {
                'field': '[SCORE]',
                'asc': 'false'
            }],
            'page': {
                'offset': '1',
                'count': 10
            },
            'fields': {
                'returnFields': 'IDX_KEY/CLFPATH/DLSRCD/REGDATE/DEPTCD/DSCLASCD/GVRNCD/GVRNNM/GVRNPATH/DEPTNM/UNTBSNM/URTXT_YN',
                'mergedFields': '',
                'mergedReturnCharCount': 60,
                'returnHighlightFields': 'TITLE',
                'facet': null
            },
            'option': {
                'operator': 'AND',
                'saveTotalcount': 1
            },
            'custom': {
                'pubopen': 'true',
                'GVRNMAPCD': '3030000'
            },
            'debug': false
        };
        api.param = {
            q: null,
            fromDt: null,
            toDt: null,
            pageNo: null,
            display: null,
            sort: null,
            nstCd: null
        };
        api.getList = function(callback) {
            var pr = ObjectCopy(config);
            for (var key in api.param) {
                var pValue = api.param[key];
                if (pValue) {
                    switch (key) {
                        case 'q':
                            pValue ? pr.keyword = pValue : null;
                            break;
                        case 'fromDt':
                            pValue ? pr.date.from = pValue : null;
                            break;
                        case 'toDt':
                            pValue ? pr.date.to = pValue : null;
                            break;
                        case 'pageNo':
                            pValue ? pr.page.offset = pValue : null;
                            break;
                        case 'display':
                            pValue ? pr.page.count = pValue : null;
                            break;
                        case 'sort':
                            if (pValue == 'title') {
                                pr.sort[0].field = 'TITLE_SORT';
                                pr.sort[0].asc = 'true'
                            } else {
                                pr.sort[0].field = 'REGDATE';
                                pr.sort[0].asc = 'false'
                            }
                            break;
                        case 'nstCd':
                            if (api.nstList) {
                                var nstCheck = $.grep(openAPI.nstList, function(e) {
                                    return e.nstCd == pValue
                                });
                                var ori = $.grep(openAPI.nstList, function(e) {
                                    return e.uprNstCd == '0000000'
                                });
                                if (nstCheck.length > 0) {
                                    pValue ? pr.custom.GVRNMAPCD = pValue : null
                                } else {
                                    ori[0].nstCd ? pr.custom.GVRNMAPCD = ori[0].nstCd : null
                                }
                            }
                            break;
                        default:
                            break
                    }
                }
            };
            var params = JSON.stringify({
                'version': '1.0',
                'service': 'FTR',
                'module': 'GvrnService',
                'func': 'getResult',
                'firstCall': false,
                'param': pr
            });
            $.ajax({
                type: 'GET',
                url: 'https://www.open.go.kr:443/search/service.do',
                data: escape(encodeURIComponent(params)),
                contentType: 'application/json; charset=UTF-8',
                dataType: 'JSONP',
                success: function(data) {
                    var keyList = ['TITLE', 'DEPTNM', 'DEPTCD', 'GVRNCD', 'GVRNNM', 'GVRNPATH', 'REGDATE', 'UNTBSNM'];
                    var rtnList = [];
                    console.log("== data ===");
                    console.log(data);
                    console.log("== data ===");
                    if (data.resultData) {
                        var info = data.resultData.info;
                        for (var i in data.resultData.data) {
                            var rtnData = {};
                            var idxKey = data.resultData.data[i].IDX_KEY.split('_');
                            for (var k in keyList) {
                                rtnData[keyList[k]] = data.resultData.data[i][keyList[k]]
                            };
                            rtnData['PRDNDT'] = idxKey[0];
                            rtnData['PRDNNSTRGSTNO'] = idxKey[1];
                            rtnList.push(rtnData)
                        };
                        callback({
                            data: rtnList,
                            info: {
                                pageNo: info.pageOffset,
                                display: info.pagePerNumber,
                                totalCount: info.totalcount
                            }
                        }, null)
                    } else {
                        callback(null, {
                            request: JSON.parse(params),
                            status: data.status,
                            error: data.message
                        })
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    callback(null, {
                        request: XMLHttpRequest,
                        status: textStatus,
                        error: errorThrown
                    })
                }
            })
        };
        api.getDetail = function(prdnDt, prdnNstRgstNo, callback) {
            var rtnList = ['prdnDt', 'prdnNstRgstNo', 'infoSj', 'prcsNstNm', 'chrgDeptNm', 'chgrNmpn', 'prdnDtView', 'docNo', 'prsrvPdCd', 'unitJobNm', 'dlsrCdNm', 'nstClNm'];
            $.ajax({
                url: 'https://www.open.go.kr:443/api/orginlDetail.down',
                data: {
                    'prdnDt': prdnDt,
                    'prdnNstRgstNo': prdnNstRgstNo
                },
                dataType: 'jsonp',
                contentType: 'application/jsonp; charset=UTF-8',
                success: function(data) {
                    var rtnObj = {};
                    for (var i in rtnList) {
                        rtnObj[rtnList[i]] = data[rtnList[i]]
                    };
                    callback(rtnObj, null)
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    callback(null, {
                        request: XMLHttpRequest,
                        status: textStatus,
                        error: errorThrown
                    })
                }
            })
        };
        api.getBillingUrl = function(prdnDt, prdnNstRgstNo, callback) {
            $.ajax({
                url: 'https://www.open.go.kr:443/api/orginlDetail.down',
                data: {
                    'prdnDt': prdnDt,
                    'prdnNstRgstNo': prdnNstRgstNo
                },
                dataType: 'jsonp',
                contentType: 'application/jsonp;charset=UTF-8',
                success: function(data) {
                    var url = 'https://www.open.go.kr:443/rqestMlrd/rqestReg/rqestRegWritingForm.do?prdctnDt=' + data.prdctnDt + '&prdctnInsttRegistNo=' + data.prdctnInsttRegistNo + '&rqestInsttCd=' + data.rqestInsttCd + '&rqestInsttNm=' + data.rqestInsttNm + '&rqestSj=' + data.rqestSj;
                    url = encodeURI(url);
                    callback(url, null)
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    callback(null, {
                        request: XMLHttpRequest,
                        status: textStatus,
                        error: errorThrown
                    })
                }
            })
        };
        api.getWonmunList = function(callback) {
        	console.log("== api.getWonmunList ==");
        	console.log(config);
        	console.log("== api.getWonmunList ==");
            config.custom['govmType'] = '';
            config.custom['dsclascd'] = '';
            config.custom['popularSearch'] = 'false';
            config.custom['partopen'] = 'true';
            config.custom['urtxtYn'] = 'Y';
            config.custom['dlsrcd'] = '1 OR 2 OR 4';
            config.custom['urtxtFile'] = 'true';
            var pr = ObjectCopy(config);
            for (var key in api.param) {
                var pValue = api.param[key];
                if (pValue) {
                    switch (key) {
                        case 'q':
                            pValue ? pr.keyword = pValue : null;
                            break;
                        case 'fromDt':
                            pValue ? pr.date.from = pValue : null;
                            break;
                        case 'toDt':
                            pValue ? pr.date.to = pValue : null;
                            break;
                        case 'pageNo':
                            pValue ? pr.page.offset = pValue : null;
                            break;
                        case 'display':
                            pValue ? pr.page.count = pValue : null;
                            break;
                        case 'sort':
                            if (pValue == 'title') {
                                pr.sort[0].field = 'TITLE_SORT';
                                pr.sort[0].asc = 'true'
                            } else {
                                pr.sort[0].field = 'REGDATE';
                                pr.sort[0].asc = 'false'
                            }
                            break;
                        case 'nstCd':
                            if (api.nstList) {
                                var nstCheck = $.grep(openAPI.nstList, function(e) {
                                    return e.nstCd == pValue
                                });
                                var ori = $.grep(openAPI.nstList, function(e) {
                                    return e.uprNstCd == '0000000'
                                });
                                if (nstCheck.length > 0) {
                                    pValue ? pr.custom.GVRNMAPCD = pValue : null
                                } else {
                                    ori[0].nstCd ? pr.custom.GVRNMAPCD = ori[0].nstCd : null
                                }
                            }
                            break;
                        default:
                            break
                    }
                }
            };
            var params = JSON.stringify({
                'version': '1.0',
                'service': 'FTR',
                'module': 'GvrnService',
                'func': 'getResult',
                'firstCall': false,
                'param': pr
            });
            $.ajax({
                type: 'GET',
                url: 'https://www.open.go.kr:443/search/service.do',
                data: escape(encodeURIComponent(params)),
                contentType: 'application/json; charset=UTF-8',
                dataType: 'JSONP',
                success: function(data) {
                    console.log("== 1data ===");
                    console.log(data);
                    console.log("== 1data ===");
                    var keyList = ['TITLE', 'DEPTNM', 'DEPTCD', 'GVRNCD', 'GVRNNM', 'GVRNPATH', 'REGDATE', 'UNTBSNM'];
                    var rtnList = [];
                    if (data.resultData) {
                        var info = data.resultData.info;
                        for (var i in data.resultData.data) {
                            var rtnData = {};
                            var idxKey = data.resultData.data[i].IDX_KEY.split('_');
                            for (var k in keyList) {
                                rtnData[keyList[k]] = data.resultData.data[i][keyList[k]]
                            };
                            rtnData['PRDNDT'] = idxKey[0];
                            rtnData['PRDNNSTRGSTNO'] = idxKey[1];
                            rtnList.push(rtnData)
                        };
                        callback({
                            data: rtnList,
                            info: {
                                pageNo: info.pageOffset,
                                display: info.pagePerNumber,
                                totalCount: info.totalcount
                            }
                        }, null)
                    } else {
                        callback(null, {
                            request: JSON.parse(params),
                            status: data.status,
                            error: data.message
                        })
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    callback(null, {
                        request: XMLHttpRequest,
                        status: textStatus,
                        error: errorThrown
                    })
                }
            })
        };
        api.getWonmunUrl = function(prdnDt, prdnNstRgstNo, callback) {
            $.ajax({
                url: 'https://www.open.go.kr:443/api/orginlDetail.down',
                data: {
                    'prdnDt': prdnDt,
                    'prdnNstRgstNo': prdnNstRgstNo
                },
                dataType: 'jsonp',
                contentType: 'application/jsonp;charset=UTF-8',
                success: function(data) {
                    if (data.urtxtYn === 'Y') {
                        var url = 'https://www.open.go.kr:443/othicInfo/infoList/infoListDetl.do?prdnDt=' + data.prdnDt + '&prdnNstRgstNo=' + data.prdnNstRgstNo;
                        url = encodeURI(url);
                        callback(url, null)
                    } else {
                        callback(null, {
                            status: 200,
                            error: 'error.'
                        })
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    callback(null, {
                        request: XMLHttpRequest,
                        status: textStatus,
                        error: errorThrown
                    })
                }
            })
        };
        var ObjectCopy = function(obj) {
            return JSON.parse(JSON.stringify(obj))
        };
        return api
    }
    if (typeof define === 'function' && define.amd) define(_openAPI);
    else if (typeof module === 'object' && module.exports) module.exports = _openAPI();
    else this.openAPI = _openAPI()
})();