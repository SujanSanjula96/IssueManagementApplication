import ballerina/http;
import ballerina/lang.value;
import ballerina/regex;

public function authorize(http:RequestContext ctx, string scope) returns http:Unauthorized? {

    value:Cloneable| object {} scopes = ctx.get("scopes");
    if scopes is error {
        return <http:Unauthorized> {
            body: "You are unauthorized to access this resource."
        } ;
    }

    string[] scopeList = regex:split(scopes.toString(), " ");
    foreach string s in scopeList {
        if (s == scope) {
            return;
        }
    }

    return <http:Unauthorized> {
        body: "You are unauthorized to access this resource."
    } ;
}

public function getUserId(http:RequestContext ctx) returns string|http:Unauthorized {

    value:Cloneable| object {} userId = ctx.get("userId");
    if userId is error {
        return <http:Unauthorized> {
            body: "You are unauthorized to access this resource."
        } ;
    }
    return userId.toString();
}