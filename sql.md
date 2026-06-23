To see every table inside your osTicket database, you can either do it in one single command from the terminal or log in to the database shell.

### Option 1: The One-Liner (Fastest)
Run this from your **osTicket Server terminal**. It will list all tables and then exit immediately:

```bash
sudo mysql -u root -p -D osticket_db -e "SHOW TABLES;"
```
*(It will ask for your root password. If you didn't set one, just hit Enter).*

---

### Option 2: The Interactive Way (Best for exploring)
If you want to stay inside the database and look around, follow these steps:

1.  **Enter the Database Shell:**
    ```bash
    sudo mysql -u root -p
    ```
2.  **Select your Database:**
    ```sql
    USE osticket_db;
    ```
3.  **List the Tables:**
    ```sql
    SHOW TABLES;
    ```

---

### Which tables should you care about for your Dashboard?
osTicket creates over 70 tables, but since you are building a **Chat UI**, these are the only ones you really need to look at:

*   **`ost_ticket`**: The main list of tickets (Number, Status, Subject).
*   **`ost_thread`**: The bridge that connects a ticket to its messages.
*   **`ost_thread_entry`**: **The most important one.** This stores the actual chat messages (the `body` column).
*   **`ost_user` & `ost_user_email`**: Stores your customers' names and email addresses.
*   **`ost_staff`**: Stores the names of your support team members.

### Want to see the columns inside a specific table?
If you want to see exactly what columns (like `poster`, `type`, `body`) are inside a table, use this command:
```sql
DESCRIBE ost_thread_entry;
```

**Did the list of tables appear?** You will see a long list starting with `ost_`. If you need to know what a specific table does, just ask!