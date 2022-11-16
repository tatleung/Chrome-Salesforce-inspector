var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { QueryHistory } from "./query-history.js";

export default function QueryManager(props) {
  var queryHistory = new QueryHistory("insextSavedQueryHistory", 50);

  var _React$useState = React.useState(queryHistory.list),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      queryList = _React$useState2[0],
      setQueryList = _React$useState2[1];

  var searchRef = React.createRef();

  var copyQuery = function copyQuery(index, event) {
    event.preventDefault();
    navigator.clipboard.writeText(queryHistory.list[index].query);
  };

  var deleteQeury = function deleteQeury(index, event) {
    event.preventDefault();
    var q = queryHistory.list[index];
    var ans = confirm(q.name ? "Deleting query \"" + q.name + "\".  Please confirm." : q.query + " \n\nis being deleted.  Please Confirm.");
    if (ans) {
      queryHistory.remove(q);
      setQueryList(Object.assign({}, queryHistory.list));
    }
  };

  var setName = function setName(index, event) {
    event.preventDefault();
    var q = queryHistory.list[index];
    var newName = prompt("Enter new name for query", queryHistory.list[index].name);
    if (newName) {
      q.name = newName;
      queryHistory.add(q);
      setQueryList(Object.assign({}, queryHistory.list));
    }
  };

  var _React$useState3 = React.useState(""),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      searchCriteria = _React$useState4[0],
      setSearchCriteria = _React$useState4[1];

  var applyFilter = function applyFilter(event) {
    setSearchCriteria(searchRef.current.value);
  };

  React.useEffect(function () {
    searchRef.current.focus();
  }, [searchRef]);

  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      { id: "user-info" },
      React.createElement(
        "a",
        { href: "#", className: "sf-link" },
        React.createElement(
          "svg",
          { "view-box": "0 0 24 24" },
          React.createElement("path", { d: "M18.9 12.3h-1.5v6.6c0 .2-.1.3-.3.3h-3c-.2 0-.3-.1-.3-.3v-5.1h-3.6v5.1c0 .2-.1.3-.3.3h-3c-.2 0-.3-.1-.3-.3v-6.6H5.1c-.1 0-.3-.1-.3-.2s0-.2.1-.3l6.9-7c.1-.1.3-.1.4 0l7 7v.3c0 .1-.2.2-.3.2z" })
        ),
        "Manage Query"
      )
    ),
    React.createElement(
      "div",
      { className: "search" },
      React.createElement("input", {
        type: "text",
        ref: searchRef,
        placeholder: "Enter filter (regex accepted, eg: account|contract)",
        onKeyUp: applyFilter
      })
    ),
    React.createElement(
      "table",
      null,
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "th",
            { className: "scrolltable-cell header" },
            "Name"
          ),
          React.createElement(
            "th",
            { className: "scrolltable-cell header" },
            "Query"
          ),
          React.createElement(
            "th",
            { className: "scrolltable-cell header" },
            "Use Tooling API"
          ),
          React.createElement("th", { className: "scrolltable-cell header" })
        )
      ),
      React.createElement(
        "tbody",
        null,
        queryHistory && queryHistory.list.filter(function (q) {
          var regex = RegExp(searchCriteria, "ig");
          return q.name.match(regex) || q.query.match(regex);
        }).map(function (q, idx) {
          return React.createElement(
            "tr",
            { key: idx },
            React.createElement(
              "td",
              {
                className: "scrolltable-cell",
                onDoubleClick: function onDoubleClick(event) {
                  return setName(idx, event);
                },
                title: "Double-click cell to edit name."
              },
              q.name ? q.name : "Unnamed"
            ),
            React.createElement(
              "td",
              {
                className: "scrolltable-cell query",
                onDoubleClick: function onDoubleClick(event) {
                  return copyQuery(idx, event);
                },
                title: "Double-click cell to copy query."
              },
              q.query
            ),
            React.createElement(
              "td",
              { className: "scrolltable-cell use-tooling-api" },
              q.useToolingApi ? "Yes" : "No"
            ),
            React.createElement(
              "td",
              { className: "scrolltable-cell action" },
              React.createElement(
                "a",
                {
                  href: "#",
                  onClick: function onClick(event) {
                    return copyQuery(idx, event);
                  },
                  title: "Copy query"
                },
                "Copy"
              ),
              React.createElement(
                "a",
                {
                  href: "#",
                  onClick: function onClick(event) {
                    return deleteQeury(idx, event);
                  },
                  title: "Delete query"
                },
                "Delete"
              )
            )
          );
        })
      )
    )
  );
}

// ========================================

var root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(QueryManager, null));