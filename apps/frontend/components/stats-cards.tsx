const StatsCards = () => {
  const cards = [
    {
      name: "Total projects",
      number: 12,
      additionalInfo: "3 active this week",
    },
    {
      name: "Open tasks",
      number: 24,
      additionalInfo: "8 due today",
    },
    {
      name: "Completed tasks",
      number: 156,
      additionalInfo: "+12 this week",
    },
    {
      name: "Learning Goals",
      number: 5,
      additionalInfo: "2 in progress",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        return (
          <div
            key={card.name}
            className="group/card flex flex-col gap-4 overflow-hidden rounded-xl bg-card p-4 text-sm text-card-foreground ring-1 ring-foreground/10"
          >
            <div className="text-muted-foreground font-medium">{card.name}</div>
            <div>
              <p className="text-2xl font-bold">{card.number}</p>
              <p className="text-xs text-muted-foreground">{card.additionalInfo}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
