import TableElements from "./TableElements";
import "../css/table.css"

const Table = (props) => {
    return (
        <div>
          <table className="container_table">
            <tbody>
              <tr>
                <th>ID</th>
                <th>ISBN</th>
                <th>Title</th>
                <th colSpan={2}>Director</th>
              </tr>
              {props.props.length &&
                props.props.map((item) => (
                    <TableElements key={item.id} props={item} />
                ))}
            </tbody>
          </table>
        </div>
    )
}

export default Table;