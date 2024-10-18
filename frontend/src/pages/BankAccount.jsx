import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for Toastify
import styles from "../CSS/BankAccounts.module.css";

const BankAccounts = () => {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editData, setEditData] = useState({});
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/bank/get`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBankAccounts(response.data.bankAccounts);
      } catch (error) {
        setError("Error fetching bank accounts", error);
        toast.error("Error fetching bank accounts"); // Toast for fetching error
      } finally {
        setLoading(false);
      }
    };

    fetchBankAccounts();
  }, []);

  const handleEditClick = (account) => {
    setIsEditing(account._id);
    setEditData(account);
  };

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`${backendUrl}/api/bank/${id}`, editData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBankAccounts((prevAccounts) =>
        prevAccounts.map((account) =>
          account._id === id ? { ...account, ...editData } : account
        )
      );
      toast.success("Bank account updated successfully!"); // Toast for successful update
    } catch (error) {
      setError("Error updating bank account", error);
      toast.error("Error updating bank account"); // Toast for update error
    } finally {
      setIsEditing(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/bank/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBankAccounts((prevAccounts) =>
        prevAccounts.filter((account) => account._id !== id)
      );
      toast.success("Bank account deleted successfully!"); // Toast for successful deletion
    } catch (error) {
      setError("Error deleting bank account", error);
      toast.error("Error deleting bank account"); // Toast for deletion error
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.errorMessage}>{error}</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Bank Accounts</h2>
      <ul className={styles.list}>
        {bankAccounts.map((account) => (
          <li key={account._id} className={styles.listItem}>
            {isEditing === account._id ? (
              <div className={styles.beforeUpdate}>
                <input
                  name="accountHolderName"
                  value={editData.accountHolderName}
                  onChange={handleInputChange}
                />
                <input
                  name="bankName"
                  value={editData.bankName}
                  onChange={handleInputChange}
                />
                <input
                  name="accountNumber"
                  value={editData.accountNumber}
                  onChange={handleInputChange}
                />
                <input
                  name="IFSCCode"
                  value={editData.IFSCCode}
                  onChange={handleInputChange}
                />
                <div className={styles.updateButtons}>
                  <button
                    className={styles.updateButton1}
                    onClick={() => handleUpdate(account._id)}
                  >
                    Update
                  </button>
                  <button
                    className={styles.updateButton2}
                    onClick={() => setIsEditing(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.userDetails}>
                <strong>
                  Account Holder Name:{" "}
                  <span className={styles.accountHolder}>
                    {account.accountHolderName}
                  </span>
                </strong>
                <strong>
                  Bank Name:{" "}
                  <span className={styles.bankName}>{account.bankName}</span>
                </strong>
                <strong>
                  Account Number:{" "}
                  <span className={styles.accountNumber}>
                    {account.accountNumber}
                  </span>
                </strong>
                <strong>
                  IFSC CODE:{" "}
                  <span className={styles.IFSCCode}>{account.IFSCCode}</span>
                </strong>
                <div className={styles.Buttons}>
                  <button
                    className={styles.button1}
                    onClick={() => handleEditClick(account)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.button2}
                    onClick={() => handleDelete(account._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <ToastContainer />{" "}
      {/* Include the ToastContainer for toast notifications */}
    </div>
  );
};

export default BankAccounts;
