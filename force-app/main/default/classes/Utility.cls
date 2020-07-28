/*
    Class: Utility
    Purpose: Utility class for HAckathon.
    Created by: Varun A
    Created date : 01/02/2020
*/
public with sharing class Utility {
    public static HTTPResponse sendRequest(HTTPRequest request)
    {
        HTTPResponse response = new HTTPResponse();
      	http h = new http();
        response = h.send(request);
        system.debug('response>>'+response);
        return response;
    }
        
    public static HttpRequest formRequest(String endPoint,String method,String body,map<String,String> headerMap)
    {
        //Create request
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endPoint);
        req.setMethod(method);
        system.debug('body>>'+body);
        if(!String.isEmpty(body))
        req.setBody(body);
        for(String header: headerMap.keySet())
        {
            req.setHeader(header, headerMap.get(header));
        }
        system.debug('request body>>'+req.getBody());
        return req;
    
	}
    
}