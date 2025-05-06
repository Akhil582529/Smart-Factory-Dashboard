// Inputs.js
import React, { useState } from 'react';
import { Box, MultiSelect, Button } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend
} from 'recharts';
import { useTranslation } from 'react-i18next';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import productionData from './ProductionData.json';
import Tables from './Table';

function Inputs() {
  const [selectedMachines, setSelectedMachines] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const { t, i18n } = useTranslation();

  const handleMachineChange = (value) => {
    setSelectedMachines(value);
  };

  const handleDateRangeChange = (value) => {
    setDateRange(value);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ko' : 'en';
    i18n.changeLanguage(newLang);
  };

  const filterData = () => {
    const [startDate, endDate] = dateRange;
    const filteredData = productionData.productionData.filter(item => {
      const date = new Date(item.date);
      const isInDateRange = startDate && endDate ? date >= new Date(startDate) && date <= new Date(endDate) : true;
      const isMachineSelected = selectedMachines.includes(item.machine);
      return isInDateRange && isMachineSelected;
    });

    const aggregatedData = aggregateData(filteredData);
    setChartData(aggregatedData);
    setTableData(filteredData);
  };

  const aggregateData = (data) => {
    const result = {};
    data.forEach(item => {
      if (!result[item.date]) {
        result[item.date] = { date: item.date };
      }
      result[item.date][item.machine] = (result[item.date][item.machine] || 0) + item.production;
    });
    return Object.values(result);
  };

  const getMachineColor = (machine) => {
    const colorMap = {
      'Machine A': '#8884d8',
      'Machine B': '#82ca9d',
      'Machine C': '#ffc658',
      'Machine D': '#ff8042',
      'Machine E': '#a4de6c',
      'Machine F': '#d0ed57',
    };
    return colorMap[machine] || '#8884d8';
  };

  return (
    <Box style={{ padding: '20px' }}>
      {/* Input controls */}
      <Box style={{ display: 'flex', gap: '20px', marginBottom: '20px', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        <MultiSelect
          label={t('selectMachines')}
          placeholder={t('chooseMachines')}
          data={['Machine A', 'Machine B', 'Machine C', 'Machine D', 'Machine E', 'Machine F']}
          w={300}
          value={selectedMachines}
          onChange={handleMachineChange}
        />

        <DatePickerInput
          type="range"
          label={t('selectDate')}
          placeholder={t('pickDates')}
          w={300}
          value={dateRange}
          onChange={handleDateRangeChange}
        />

        <Button onClick={filterData} variant="filled" color="violet" style={{ height: '40px' }}>
          {t('generateChart')}
        </Button>

        <Button onClick={toggleLanguage} variant="outline" style={{ height: '40px' }}>
          {i18n.language === 'en' ? '한국어' : 'English'}
        </Button>
      </Box>

      {/* Bar Chart */}
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {selectedMachines.map(machine => (
              <Bar key={machine} dataKey={machine} fill={getMachineColor(machine)} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p style={{ textAlign: 'center' }}>{t('noData') || 'No data available for the selected filters.'}</p>
      )}

      {/* Table */}
      <Tables tableData={tableData} />
    </Box>
  );
}

export default Inputs;
