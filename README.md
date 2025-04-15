Project Report: Bidirectional Data Ingestion Tool Between ClickHouse and Flat File

---

1. Project Overview

This project involves the development of a bidirectional data ingestion tool between ClickHouse (a columnar database) and flat files (e.g., CSV, TSV). The system includes a user-friendly web interface and supports secure authentication, data selection, and ingestion monitoring.

---

2. Key Features

- Bidirectional Data Flow:
  - Export data from ClickHouse to flat files.
  - Import data from flat files to ClickHouse.

- Web UI:
  - Built using HTML/CSS and Flask.
  - Intuitive layout for users to select source/destination, columns, and trigger data transfer.

- Authentication:
  - Implemented using JSON Web Tokens (JWT).
  - Ensures only authorized users can access the tool.

- Column Selection:
  - Users can select specific columns during export/import.

- Reporting:
  - Provides feedback on number of records processed, success status, and any errors encountered.

---

3. Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Python (Flask)
- Database: ClickHouse
- Authentication: JWT

---

4. Directory Structure

```
clickhouse-flatfile-ingestion/
├── backend/
│   ├── main.py
│   ├── clickhouse_utils.py
│   ├── flatfile_utils.py
│   └── auth.py
├── templates/
│   └── index.html
├── static/
│   └── styles.css
└── README.md
```

---

5. How to Run the Project

1. Clone the repository.
2. Set up virtual environment and install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Launch the backend:
   ```bash
   cd backend
   python main.py
   ```
4. Access the app at `http://127.0.0.1:5000`.

---

6. Challenges Faced

- Handling large CSV files efficiently.
- Ensuring accurate data type conversion.
- Integrating JWT securely.

---

7. Conclusion

This tool offers a secure, easy-to-use platform for moving data between ClickHouse and flat files. The modular architecture allows for scalability and future enhancements like data transformation or scheduling.

---

8. Future Enhancements

- Add support for scheduling recurring data transfers.
- Add logging and more detailed error reports.
- Dockerize the project for easy deployment.
- Add unit tests for core modules.
