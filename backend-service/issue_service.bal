import ballerina/http;
import ballerina/uuid;

listener http:Listener api = new (port,
    interceptors = [new AuthInterceptor()]
);

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowCredentials: true,
        maxAge: 84900
    }
}

service / on api {

    resource function get issues(http:RequestContext ctx) returns Issue[]|http:Unauthorized {

        _ = check authorize(ctx, "issues:view");
        string|http:Unauthorized userId = getUserId(ctx);
        if userId is http:Unauthorized {
            return userId;
        }

        Issue[] response = [];
        foreach var issue in issuesTable {
            response.push(issue);
        }
        return response;
    }

    resource function post issues(http:RequestContext ctx, @http:Payload Name payload) returns Issue|http:Unauthorized|http:InternalServerError {

        _ = check authorize(ctx, "issues:create");
        string|http:Unauthorized userId = getUserId(ctx);
        if userId is http:Unauthorized {
            return userId;
        }

        string uuid = uuid:createType4AsString();
        Issue issue= {
            id: uuid,
            name: payload.name,
            status: OPEN,
            ownerId: userId
        };
        issuesTable.add(issue);
        return issue;
    }

    resource function patch issues/[string issueId](http:RequestContext ctx, @http:Payload Status payload) returns Issue|http:NotFound|http:Unauthorized {

        _ = check authorize(ctx, "issues:close");
        string|http:Unauthorized userId = getUserId(ctx);
        if userId is http:Unauthorized {
            return userId;
        }

        if !issuesTable.hasKey(issueId) {
            return http:NOT_FOUND;
        }
        
        Issue issue = issuesTable.get(issueId);
        issue.status = payload.status;
        issuesTable.put(issue);
        return issue;
    }
}
