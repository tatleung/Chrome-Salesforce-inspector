import { QueryHistory } from "./query-history.js";

export default function QueryManager(props) {
  const queryHistory = new QueryHistory("insextSavedQueryHistory", 50);
  const [queryList, setQueryList] = React.useState(queryHistory.list);

  const searchRef = React.createRef();

  const copyQuery = (index, event) => {
    event.preventDefault();
    navigator.clipboard.writeText(queryHistory.list[index].query);
  };

  const deleteQeury = (index, event) => {
    event.preventDefault();
    const q = queryHistory.list[index];
    const ans = confirm(
      q.name
        ? `Deleting query "${q.name}".  Please confirm.`
        : `${q.query} \n\nis being deleted.  Please Confirm.`
    );
    if (ans) {
      queryHistory.remove(q);
      setQueryList({ ...queryHistory.list });
    }
  };

  const setName = (index, event) => {
    event.preventDefault();
    const q = queryHistory.list[index];
    const newName = prompt(
      "Enter new name for query",
      queryHistory.list[index].name
    );
    if (newName) {
      q.name = newName;
      queryHistory.add(q);
      setQueryList({ ...queryHistory.list });
    }
  };

  const [searchCriteria, setSearchCriteria] = React.useState("");
  const applyFilter = (event) => {
    setSearchCriteria(searchRef.current.value);
  };

  React.useEffect(() => {
    searchRef.current.focus();
  }, [searchRef]);

  return (
    <div>
      <div id="user-info">
        <a href="#" className="sf-link">
          <svg view-box="0 0 24 24">
            <path d="M18.9 12.3h-1.5v6.6c0 .2-.1.3-.3.3h-3c-.2 0-.3-.1-.3-.3v-5.1h-3.6v5.1c0 .2-.1.3-.3.3h-3c-.2 0-.3-.1-.3-.3v-6.6H5.1c-.1 0-.3-.1-.3-.2s0-.2.1-.3l6.9-7c.1-.1.3-.1.4 0l7 7v.3c0 .1-.2.2-.3.2z" />
          </svg>
          Manage Query
        </a>
      </div>
      <div className="search">
        <input
          type="text"
          ref={searchRef}
          placeholder="Enter filter (regex accepted, eg: account|contract)"
          onKeyUp={applyFilter}
        ></input>
      </div>
      <table>
        <thead>
          <tr>
            <th className="scrolltable-cell header">Name</th>
            <th className="scrolltable-cell header">Query</th>
            <th className="scrolltable-cell header">Use Tooling API</th>
            <th className="scrolltable-cell header"></th>
          </tr>
        </thead>
        <tbody>
          {queryHistory &&
            queryHistory.list
              .filter((q) => {
                const regex = RegExp(searchCriteria, "ig");
                return q.name.match(regex) || q.query.match(regex);
              })
              .map((q, idx) => (
                <tr key={idx}>
                  <td
                    className="scrolltable-cell"
                    onDoubleClick={(event) => setName(idx, event)}
                    title="Double-click cell to edit name."
                  >
                    {q.name ? q.name : "Unnamed"}
                  </td>
                  <td
                    className="scrolltable-cell query"
                    onDoubleClick={(event) => copyQuery(idx, event)}
                    title="Double-click cell to copy query."
                  >
                    {q.query}
                  </td>
                  <td className="scrolltable-cell use-tooling-api">
                    {q.useToolingApi ? "Yes" : "No"}
                  </td>
                  <td className="scrolltable-cell action">
                    <a
                      href="#"
                      onClick={(event) => copyQuery(idx, event)}
                      title="Copy query"
                    >
                      Copy
                    </a>
                    <a
                      href="#"
                      onClick={(event) => deleteQeury(idx, event)}
                      title="Delete query"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<QueryManager />);
