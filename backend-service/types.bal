public enum IssueStatus {
    OPEN = "Open",
    CLOSED = "Closed"
}

public type Status record {
    IssueStatus status;
};

public type Name record {
    string name;
};

public type Issue record {
    readonly string id;
    string name;
    string status;
    string ownerId;
};
