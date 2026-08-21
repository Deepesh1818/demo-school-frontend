import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '../../components/common/Button';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function LibraryCMS() {
  const [books, setBooks] = useState([]);
  const [logs, setLogs] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  useEffect(() => {
    fetchBooks();
    fetchLogs();
    fetchStudents();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch(`${API_URL}/library/books`, { headers });
      const json = await res.json();
      if (json.success) setBooks(json.data);
    } catch (e) {}
    setLoading(false);
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch(`${API_URL}/library/transactions`, { headers });
      const json = await res.json();
      if (json.success) setLogs(json.data);
    } catch (e) {}
  };

  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_URL}/students?limit=100`, { headers });
      const json = await res.json();
      if (json.success) setStudents(json.data);
    } catch (e) {}
  };

  const handleReturnBook = async (logId) => {
    try {
      const res = await fetch(`${API_URL}/library/return/${logId}`, {
        method: 'PUT',
        headers
      });
      const data = await res.json();
      if (data.success) {
        alert('Book returned successfully!');
        fetchBooks();
        fetchLogs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCatalogBook = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target);
    const body = {
      title: formData.get('title'),
      author: formData.get('author'),
      isbn: formData.get('isbn'),
      category: formData.get('category'),
      totalCopies: Number(formData.get('totalCopies')),
      availableCopies: Number(formData.get('totalCopies'))
    };

    try {
      const res = await fetch(`${API_URL}/library/books`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });
      const json = await res.json();
      if (json.success) {
        setIsModalOpen(false);
        fetchBooks();
      } else {
        alert(json.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleIssueBook = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.target);
    const body = {
      studentId: formData.get('studentId'),
      bookId: formData.get('bookId')
    };

    try {
      const res = await fetch(`${API_URL}/library/issue`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });
      const json = await res.json();
      if (json.success) {
        setIsIssueModalOpen(false);
        fetchBooks();
        fetchLogs();
      } else {
        alert(json.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold font-display text-white">Media Library Console</h1>
          <p className="text-[10px] text-slate-500 font-sans tracking-wide uppercase mt-0.5">Manage library catalog and active book borrowing logs</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setIsIssueModalOpen(true)} className="text-brand-gold border-brand-gold/30 hover:bg-slate-800">
            Issue Book
          </Button>
          <Button variant="secondary" onClick={() => setIsModalOpen(true)} className="flex items-center gap-1">
            <Plus className="h-4 w-4" /> Catalog Book
          </Button>
        </div>
      </div>

      {/* Roster books table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-5 flex flex-col gap-4">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider">Book Inventory Catalog</h3>
        {loading ? (
          <div className="text-center py-6 text-slate-500 text-xs">Loading logs...</div>
        ) : books.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-xs">No books in catalog.</div>
        ) : (
          <div className="w-full overflow-x-auto -webkit-overflow-scrolling-touch">
            <table className="w-full min-w-[700px] border-collapse text-left text-xs text-slate-300">
              <thead>
                <tr className="border-b border-slate-850 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                  <th className="p-4">Title</th>
                  <th className="p-4">Author</th>
                  <th className="p-4">ISBN</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Stock (Available / Total)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {books.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-850/30">
                    <td className="p-4 font-semibold text-white">{b.title}</td>
                    <td className="p-4">{b.author}</td>
                    <td className="p-4 font-mono text-slate-500">{b.isbn}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-[9px] text-white uppercase tracking-wider font-bold">
                        {b.category}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-white">
                      {b.availableCopies} / {b.totalCopies} Copies
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Borrow transactions logs */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden p-5 flex flex-col gap-4">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider">Active Borrowing Sheets</h3>
        {logs.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-xs">No active borrow checkouts.</div>
        ) : (
          <div className="w-full overflow-x-auto -webkit-overflow-scrolling-touch">
            <table className="w-full min-w-[700px] border-collapse text-left text-xs text-slate-300">
              <thead>
                <tr className="border-b border-slate-850 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                  <th className="p-4">Book borrowed</th>
                  <th className="p-4">Student Name</th>
                  <th className="p-4">Issue Date</th>
                  <th className="p-4">Due Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Return action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {logs.map((log) => (
                  <tr key={log._id} className="hover:bg-slate-850/30">
                    <td className="p-4 font-semibold text-white">{log.book?.title}</td>
                    <td className="p-4">{log.student?.firstName} {log.student?.lastName}</td>
                    <td className="p-4 text-slate-400">{new Date(log.issueDate).toLocaleDateString()}</td>
                    <td className="p-4 text-slate-400">{new Date(log.dueDate).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                        log.status === 'Returned' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {log.status === 'Issued' && (
                        <button
                          onClick={() => handleReturnBook(log._id)}
                          className="py-1 px-2.5 rounded bg-brand-gold hover:bg-brand-goldlight text-brand-navy font-bold uppercase text-[9px] tracking-wide transition-colors"
                        >
                          Mark Return
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Catalog Book Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-sm p-8 relative">
            <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3 mb-5 uppercase tracking-wider">
              Catalog Book to Library
            </h3>
            
            <form onSubmit={handleCatalogBook} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Book Title</label>
                <input
                  name="title"
                  required
                  placeholder="e.g. Brief History of Time"
                  className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Author Name</label>
                <input
                  name="author"
                  required
                  placeholder="e.g. Stephen Hawking"
                  className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">ISBN Number</label>
                  <input
                    name="isbn"
                    required
                    placeholder="978-0553380163"
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Copies count</label>
                  <input
                    name="totalCopies"
                    type="number"
                    required
                    placeholder="5"
                    className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-200 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Category</label>
                <select
                  name="category"
                  required
                  className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-400 text-xs focus:outline-none"
                >
                  <option value="Science">Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Literature">Literature</option>
                  <option value="History">History</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Biography">Biography</option>
                  <option value="Computers">Computers</option>
                  <option value="Reference">Reference</option>
                </select>
              </div>

              <div className="flex gap-4 justify-end mt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="text-slate-400 border-slate-800">
                  Cancel
                </Button>
                <Button variant="secondary" type="submit" isLoading={submitting}>
                  Catalog Book
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Issue Book Modal */}
      {isIssueModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-sm p-8 relative">
            <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3 mb-5 uppercase tracking-wider">
              Issue Book Checkout
            </h3>
            
            <form onSubmit={handleIssueBook} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Select Student</label>
                <select
                  name="studentId"
                  required
                  className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-400 text-xs focus:outline-none"
                >
                  <option value="">Select Student</option>
                  {students.map(s => (
                    <option key={s._id} value={s._id}>{s.firstName} {s.lastName} ({s.studentId})</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Select Book</label>
                <select
                  name="bookId"
                  required
                  className="bg-slate-950 border border-slate-850 rounded-lg p-2.5 text-slate-400 text-xs focus:outline-none"
                >
                  <option value="">Select Book</option>
                  {books.filter(b => b.availableCopies > 0).map(b => (
                    <option key={b._id} value={b._id}>{b.title} (Avail: {b.availableCopies})</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4 justify-end mt-4">
                <Button variant="outline" onClick={() => setIsIssueModalOpen(false)} className="text-slate-400 border-slate-800">
                  Cancel
                </Button>
                <Button variant="secondary" type="submit" isLoading={submitting}>
                  Issue Book
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
