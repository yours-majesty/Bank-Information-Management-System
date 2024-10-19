import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../CSS/Dashboard.module.css';

const Dashboard = () => {
    const [bankAccounts, setBankAccounts] = useState([]);
    const [filteredAccounts, setFilteredAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchBankAccounts = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/admin/allusers`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setBankAccounts(response.data.bankAccounts);
                setFilteredAccounts(response.data.bankAccounts);
            } catch (error) {
                setError('Error fetching bank accounts');
            } finally {
                setLoading(false);
            }
        };

        fetchBankAccounts();
    }, []);

    useEffect(() => {
        const results = bankAccounts.filter(account =>
            account.accountHolderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            account.bankName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAccounts(results);
    }, [searchTerm, bankAccounts]);

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.errorMessage}>{error}</div>;

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Admin Panel - Bank Accounts of All Users</h2>
            <input
                type="text"
                placeholder="Search by Account Holder Name or Bank Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
            />
            <ul className={styles.list}>
                {filteredAccounts.map((account) => (
                    <li key={account._id} className={styles.listItem}>
                        <strong>Account Holder Name:</strong> {account.accountHolderName}<br />
                        <strong>Bank Name:</strong> {account.bankName}<br />
                        <strong>Account Number:</strong> {account.accountNumber}<br />
                        <strong>IFSC CODE:</strong> {account.IFSCCode}<br />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
