import React, { useState, useEffect } from 'react';
import CustomerLayout from '../components/customer/CustomerLayout';
import WelcomeSection from '../components/customer/WelcomeSection';
import StatsCards from '../components/customer/StatsCards';
import AIAssistantCard from '../components/customer/AIAssistantCard';
import RecentTickets from '../components/customer/RecentTickets';
import ticketApi from '../services/ticketApi';
import { Ticket } from '../types';

export const CustomerDashboard: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      const data = await ticketApi.getMyTickets();
      setTickets(data || []);
    } catch (err) {
      console.error('Error fetching customer tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <WelcomeSection />
        <StatsCards tickets={tickets} loading={loading} />
        <AIAssistantCard onTicketCreated={fetchTickets} />
        <RecentTickets tickets={tickets} loading={loading} />
      </div>
    </CustomerLayout>
  );
};

export default CustomerDashboard;
