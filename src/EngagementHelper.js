import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const EngagementHelper = ({ messageCountList, channels }) => {
  // Filter channels that have messages on more than 1 date
  const relevantChannels = channels.filter((channel) => {
    const channelId = channel.value;
    return messageCountList.filter((message) => message.channelId === channelId).length > 1;
  });

  // Extract data for relevant channels
  const chartData = relevantChannels.map((channel) => {
    const channelId = channel.value;
    const channelMessages = messageCountList.filter((message) => message.channelId === channelId);
    const data = channelMessages.map((message) => ({
      x: new Date(message.timeBucket).getTime(),
      y: parseInt(message.count),
      channelId: message.channelId,
      channelName: channel.label,
    }));
    return {
      name: channel.label,
      data,
      
    };
    
});

// chartData display on console
// console.log(chartData)


  // Highcharts configuration options
  const options = {
    chart: {
      type: 'spline',
    },
    title: {
      text: 'Engagement Messages Over Time',
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Date',
      },
    },
    yAxis: {
      title: {
        text: 'Message Count',
      },
    },
    tooltip: {
      formatter: function () {
        return `<b>${this.series.name}</b><br>${Highcharts.dateFormat('%Y-%m-%d', this.x)}<br>Messages: ${this.y}`;
      },
    },
    series: chartData,
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default EngagementHelper;
