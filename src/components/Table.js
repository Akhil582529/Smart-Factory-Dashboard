import React from 'react';

function Tables({ tableData }) {
  return (
    <div style={{ marginTop: '20px', padding: '10px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Arial, sans-serif' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Machine Name</th>
            <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Status</th>
            <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Output</th>
            <th style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
              <td style={{ padding: '10px' }}>{item.machine}</td>
              <td
                style={{
                  padding: '10px',
                  color: item.status === 'Active' ? 'green' : 'red',
                }}
              >
                {item.status}
              </td>
              <td style={{ padding: '10px' }}>{item.production}</td>
              <td style={{ padding: '10px' }}>{item.lastUpdated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tables;
