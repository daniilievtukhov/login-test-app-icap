import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import API from "@/service";
import Image from "next/image";
import img from "../images/meme.png";
export type TableProps = {};
type TableData = {
    id: number;
    name: string;
    email: string;
    birthday_date: string;
    phone_number: string;
    address?: string;
};

const Table: React.FC<TableProps> = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage: number = 5;
    const [data, setData] = useState<TableData[]>([]);
    const npage = Math.ceil(data.length / recordsPerPage);
    const [editId, setEditId] = useState(-1);
    const [editedData, setEditedData] = useState<TableData | null>(null);

    useEffect(() => {
        API.getTable()
            .then((response) => {
                setData(response.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function deleteUser(id: number) {
        API.deleteTableId(id)
            .then(() => {
                const updatedData = data.filter((user) => user.id !== id);
                setData(updatedData);
            })
            .catch((error) => {
                alert("You don't have permission to delete it :(");
            });
    }

    const handleEdit = (id: number) => {
        setEditId(id);
        const userToEdit = data.find((user) => user.id === id);
        if (userToEdit) {
            setEditedData(userToEdit);
        }
    };

    const handleUpdate = () => {
        if (editedData) {
            API.updateTableId(editedData.id, editedData)
                .then(() => {
                    const updatedData = data.map((user) =>
                        user.id === editedData.id ? editedData : user
                    );
                    setData(updatedData);
                    setEditId(-1);
                })
                .catch((error) => {
                    console.error("Помилка при оновленні даних:", error);
                });
        }
    };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        key: keyof TableData
    ) => {
        if (editedData) {
            setEditedData({ ...editedData, [key]: event.target.value });
        }
    };

    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = data.slice(firstIndex, lastIndex);

    const numbers = Array.from({ length: npage }, (_, i) => i + 1);

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Birth</th>
                        <th>Phone</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((tableData) => (
                        <tr key={tableData.id}>
                            {tableData.id === editId ? (
                                <>
                                    <td>{tableData.id}</td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editedData?.name || ""}
                                            onChange={(e) =>
                                                handleInputChange(e, "name")
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editedData?.email || ""}
                                            onChange={(e) =>
                                                handleInputChange(e, "email")
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={
                                                editedData?.birthday_date || ""
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    e,
                                                    "birthday_date"
                                                )
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={
                                                editedData?.phone_number || ""
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    e,
                                                    "phone_number"
                                                )
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editedData?.address || ""}
                                            onChange={(e) =>
                                                handleInputChange(e, "address")
                                            }
                                        />
                                    </td>
                                    <td>
                                        <button onClick={handleUpdate}>
                                            Update
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{tableData.id}</td>
                                    <td>{tableData.name}</td>
                                    <td>{tableData.email}</td>
                                    <td>{tableData.birthday_date}</td>
                                    <td>{tableData.phone_number}</td>
                                    <td>{tableData.address}</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleEdit(tableData.id)
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                deleteUser(tableData.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav style={{ display: "flex", justifyContent: "center" }}>
                <ul className="pagination">
                    <li className="page-item">
                        <a href="#" className="page-link" onClick={prePage}>
                            Prev
                        </a>
                    </li>
                    {numbers.map((n) => (
                        <li
                            className={`page-item ${
                                currentPage === n ? "active" : ""
                            }`}
                            key={n}
                        >
                            <a
                                href="#"
                                className="page-link"
                                onClick={() => changeCPage(n)}
                            >
                                {n}
                            </a>
                        </li>
                    ))}
                    <li className="page-item">
                        <a href="#" className="page-link" onClick={nextPage}>
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Image src={img} alt="Meme" />
            </div>
            <p>
                I am a responsible and goal-oriented person with a quick
                learning ability. I was involved in a non- commercial project
                that has given me an understanding of Scrum methodology. Working
                in a well-organized team I have learned to be a good team
                player. Hope, you'll give me a chance!{" "}
            </p>
        </div>
    );

    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function changeCPage(id: number) {
        setCurrentPage(id);
    }

    function nextPage() {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
    }
};

export default Table;
