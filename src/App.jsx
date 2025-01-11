import { BarChart3, DollarSign, Package, PackageX } from 'lucide-react';
import { useEffect, useState } from 'react';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('3'); 
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [stats, setStats] = useState({
    totalSales: 0,
    soldItems: 0,
    notSoldItems: 0
  });
  const [chartData, setChartData] = useState([]);

  const months = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  useEffect(() => {
    fetchTransactions();
    fetchStats();
    fetchChartData();
  }, [selectedMonth, searchText, page]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`/api/transactions?month=${selectedMonth}&search=${searchText}&page=${page}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`/api/statistics?month=${selectedMonth}`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const fetchChartData = async () => {
    try {
      const response = await fetch(`/api/chart-data?month=${selectedMonth}`);
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Transaction Dashboard</h1>
        
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Sales</p>
                <p className="text-2xl font-semibold text-gray-900">${stats.totalSales.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Sold Items</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.soldItems}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-full">
                <PackageX className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Not Sold Items</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.notSoldItems}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center mb-4">
            <BarChart3 className="h-6 w-6 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900 ml-2">Price Range Distribution</h2>
          </div>
          <div className="h-64">
            {/* Chart will be implemented here */}
            <div className="flex items-end justify-between h-full">
              {chartData.map((item, index) => (
                <div key={index} className="flex flex-col items-center w-full">
                  <div 
                    className="bg-blue-500 rounded-t w-4/5" 
                    style={{ height: `${(item.count / Math.max(...chartData.map(d => d.count))) * 100}%` }}
                  ></div>
                  <p className="text-xs text-gray-500 mt-2">{item.range}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
                
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${transaction.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.sold ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.sold ? 'Sold' : 'Not Sold'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;