import { useState, useEffect } from 'react';

function useGroup() {
  const [groups, setGroups] = useState([]);
  const [totalOwed, setTotalOwed] = useState(0);
  const [totalOwedToYou, setTotalOwedToYou] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch groups
    const fetchGroups = async () => {
      try {
        // Mock data - replace with actual API call
        const mockGroups = [
          {
            id: 1,
            name: 'Trip to Goa',
            members: [
              { id: 1, name: 'John', avatar: 'JD', balance: 250 },
              { id: 2, name: 'Alice', avatar: 'AL', balance: -150 },
              { id: 3, name: 'Bob', avatar: 'BO', balance: -100 }
            ],
            totalBalance: 0
          },
          {
            id: 2,
            name: 'Dinner Party',
            members: [
              { id: 1, name: 'John', avatar: 'JD', balance: 75 },
              { id: 4, name: 'Sarah', avatar: 'SA', balance: -75 }
            ],
            totalBalance: 0
          }
        ];

        setGroups(mockGroups);

        // Calculate totals
        const owed = mockGroups.reduce((acc, group) =>
          acc + group.members.filter(m => m.balance < 0).reduce((sum, m) => sum + Math.abs(m.balance), 0), 0
        );
        const owedToYou = mockGroups.reduce((acc, group) =>
          acc + group.members.filter(m => m.balance > 0).reduce((sum, m) => sum + m.balance, 0), 0
        );

        setTotalOwed(owed);
        setTotalOwedToYou(owedToYou);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching groups:', error);
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  return {
    groups,
    totalOwed,
    totalOwedToYou,
    loading,
    refetch: () => {
      setLoading(true);
      // Refetch logic here
    }
  };
}

export default useGroup;
