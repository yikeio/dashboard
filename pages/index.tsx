import {
  Card,
  Metric,
  Text,
  AreaChart,
  BadgeDelta,
  Flex,
  DeltaType,
  List,
  ListItem,
  Icon,
  Bold,
  Title,
  Button,
  Color,
  Grid
} from '@tremor/react';
import { ArrowRightIcon, BriefcaseIcon } from 'lucide-react';

const data = [
  {
    Month: 'Jan 21',
    Sales: 2890,
    Profit: 2400,
    Customers: 4938
  },
  {
    Month: 'Feb 21',
    Sales: 1890,
    Profit: 1398,
    Customers: 2938
  },
  // ...
  {
    Month: 'Jul 21',
    Sales: 3490,
    Profit: 4300,
    Customers: 2345
  }
];

const categories: {
  title: string;
  metric: string;
  metricPrev: string;
  delta: string;
  deltaType: DeltaType;
}[] = [
  {
    title: 'Sales',
    metric: '$ 12,699',
    metricPrev: '$ 9,456',
    delta: '34.3%',
    deltaType: 'moderateIncrease'
  },
  {
    title: 'Profit',
    metric: '$ 12,348',
    metricPrev: '$ 10,456',
    delta: '18.1%',
    deltaType: 'moderateIncrease'
  },
  {
    title: 'Customers',
    metric: '948',
    metricPrev: '1,082',
    delta: '12.3%',
    deltaType: 'moderateDecrease'
  }
];

type TransactionCategory = {
  name: string;
  color: Color;
  numTransactions: number;
  amount: string;
};

const march: TransactionCategory[] = [
  {
    name: 'Groceries',
    color: 'sky',
    numTransactions: 24,
    amount: '$ 230'
  },
  {
    name: 'IT & Office',
    color: 'orange',
    numTransactions: 4,
    amount: '$ 990'
  },
  {
    name: 'Travel',
    color: 'pink',
    numTransactions: 11,
    amount: '$ 2,345'
  },
  {
    name: 'Insurance',
    color: 'emerald',
    numTransactions: 2,
    amount: '$ 1,450'
  }
];

const april: TransactionCategory[] = [
  {
    name: 'Food',
    color: 'teal',
    numTransactions: 32,
    amount: '$ 490'
  },
  {
    name: 'Travel',
    color: 'pink',
    numTransactions: 3,
    amount: '$ 678'
  },
  {
    name: 'IT & Office',
    color: 'orange',
    numTransactions: 2,
    amount: '$ 120'
  },
  {
    name: 'Transport',
    color: 'indigo',
    numTransactions: 12,
    amount: '$ 560'
  }
];

const may: TransactionCategory[] = [
  {
    name: 'Sports',
    color: 'rose',
    numTransactions: 89,
    amount: '$ 2,300.90'
  },
  {
    name: 'Groceries',
    color: 'emerald',
    numTransactions: 9,
    amount: '$ 1,087'
  },
  {
    name: 'Travel',
    color: 'pink',
    numTransactions: 19,
    amount: '$ 1,030'
  },
  {
    name: 'Restaurants',
    color: 'amber',
    numTransactions: 8,
    amount: '$ 129'
  }
];

const months = [
  {
    name: 'March 2022',
    data: march
  },
  {
    name: 'April 2022',
    data: april
  },
  {
    name: 'May 2022',
    data: may
  }
];

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;

export default function IndexPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Hello! </h1>
      <div className="gap-6 grid grid-cols-3">
        {categories.map((item) => (
          <Card key={item.title}>
            <Flex alignItems="start">
              <Text>{item.title}</Text>
              <BadgeDelta deltaType={item.deltaType}>{item.delta}</BadgeDelta>
            </Flex>
            <Flex
              className="space-x-3 truncate"
              justifyContent="start"
              alignItems="baseline"
            >
              <Metric>{item.metric}</Metric>
              <Text>from {item.metricPrev}</Text>
            </Flex>
            <AreaChart
              className="mt-6 h-28"
              data={data}
              index="Month"
              valueFormatter={valueFormatter}
              categories={[item.title]}
              colors={['blue']}
              showXAxis={true}
              showGridLines={false}
              startEndOnly={true}
              showYAxis={false}
              showLegend={false}
            />
          </Card>
        ))}
      </div>

      <div className="gap-6 grid grid-cols-3">
        {months.map((item) => (
          <Card key={item.name}>
            <Title>Transaction Volume</Title>
            <Text>{item.name}</Text>
            <List className="mt-4">
              {item.data.map((transaction) => (
                <ListItem key={transaction.name}>
                  <Flex justifyContent="start" className="truncate space-x-4">
                    <div className="truncate">
                      <Text className="truncate">
                        <Bold>{transaction.name}</Bold>
                      </Text>
                      <Text className="truncate">
                        {`${transaction.numTransactions} transactions`}
                      </Text>
                    </div>
                  </Flex>
                  <Text>{transaction.amount}</Text>
                </ListItem>
              ))}
            </List>
            <Button
              size="sm"
              variant="light"
              icon={ArrowRightIcon}
              iconPosition="right"
              className="mt-4"
            >
              View details
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
