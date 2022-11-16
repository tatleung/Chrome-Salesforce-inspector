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
      <div className="search">
        <input
          type="text"
          ref={searchRef}
          placeholder="Enter search criteria"
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
                    className="scrolltable-cell"
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
