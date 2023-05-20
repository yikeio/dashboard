import StatsApi from '@/api/stats';
import Loading from '@/components/loading';
import UserCell from '@/components/user-cell';
import {
  Card,
  Metric,
  Text,
  AreaChart,
  BadgeDelta,
  Flex,
  List,
  ListItem,
  Bold,
  Title,
  Button
} from '@tremor/react';
import { ArrowRightIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function IndexPage() {
  const {
    data: stats,
    error,
    mutate,
    isLoading
  } = useSWR(`stats`, StatsApi.get);

  const router = useRouter();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Hello! </h1>
      <div className="gap-6 grid grid-cols-3">
        <Card>
          <Flex alignItems="start">
            <Text>用户</Text>
            <BadgeDelta
              deltaType={
                stats.users.this_month_total === stats.users.last_month_total
                  ? 'unchanged'
                  : stats.users.this_month_total > stats.users.last_month_total
                  ? 'moderateIncrease'
                  : 'moderateDecrease'
              }
            >
              {Math.abs(
                stats.users.this_month_total - stats.users.last_month_total
              )}
            </BadgeDelta>
          </Flex>
          <Flex
            className="space-x-3 truncate"
            justifyContent="start"
            alignItems="baseline"
          >
            <Metric>{stats.users.total}</Metric>
            <Text>上月今天 {stats.users.last_month_total}</Text>
          </Flex>
          <AreaChart
            className="mt-6 h-28"
            data={stats.users.recent_daily_count}
            index="date"
            categories={['value']}
            colors={['blue']}
            showXAxis={true}
            showGridLines={false}
            startEndOnly={true}
            showYAxis={false}
            showLegend={false}
          />
        </Card>

        <Card>
          <Flex alignItems="start">
            <Text>支付</Text>
            <BadgeDelta
              deltaType={
                stats.payments.this_month_total ===
                stats.payments.last_month_total
                  ? 'unchanged'
                  : stats.payments.this_month_total >
                    stats.payments.last_month_total
                  ? 'moderateIncrease'
                  : 'moderateDecrease'
              }
            >
              ￥
              {Math.abs(
                stats.payments.this_month_total -
                  stats.payments.last_month_total
              ).toFixed(2)}
            </BadgeDelta>
          </Flex>
          <Flex
            className="space-x-3 truncate"
            justifyContent="start"
            alignItems="baseline"
          >
            <Metric>￥{stats.payments.total}</Metric>
            <Text>上月今天 ￥{stats.payments.last_month_total}</Text>
          </Flex>
          <AreaChart
            className="mt-6 h-28"
            data={stats.payments.recent_daily_amount}
            index="date"
            categories={['value']}
            colors={['blue']}
            showXAxis={true}
            showGridLines={false}
            startEndOnly={true}
            showYAxis={false}
            showLegend={false}
          />
        </Card>

        <Card>
          <Flex alignItems="start">
            <Text>对话</Text>
            <BadgeDelta
              deltaType={
                stats.conversations.this_month_total ===
                stats.conversations.last_month_total
                  ? 'unchanged'
                  : stats.conversations.this_month_total >
                    stats.conversations.last_month_total
                  ? 'moderateIncrease'
                  : 'moderateDecrease'
              }
            >
              {Math.abs(
                stats.conversations.this_month_total -
                  stats.conversations.last_month_total
              )}
            </BadgeDelta>
          </Flex>
          <Flex
            className="space-x-3 truncate"
            justifyContent="start"
            alignItems="baseline"
          >
            <Metric>{stats.conversations.total}</Metric>
            <Text>上月今天 {stats.conversations.last_month_total}</Text>
          </Flex>
          <AreaChart
            className="mt-6 h-28"
            data={stats.conversations.recent_daily_count}
            index="date"
            categories={['value']}
            colors={['blue']}
            showXAxis={true}
            showGridLines={false}
            startEndOnly={true}
            showYAxis={false}
            showLegend={false}
          />
        </Card>
      </div>

      <div className="gap-6 grid grid-cols-3">
        <Card>
          <Title>活跃用户</Title>
          <Text>按照用户的会话数量排行</Text>
          <List className="mt-4">
            {stats.users.leaderboards.by_conversation_count.map(
              (item: {
                user: { id: number; name: string; avatar: string };
                count: number;
              }) => (
                <ListItem key={item.user.id}>
                  <Flex justifyContent="start" className="truncate space-x-4">
                    <div className="truncate py-1">
                      <Text className="truncate">
                        <UserCell user={item.user} />
                      </Text>
                    </div>
                  </Flex>
                  <Text>{item.count} 次</Text>
                </ListItem>
              )
            )}
          </List>
          <Button
            size="sm"
            variant="light"
            icon={ArrowRightIcon}
            iconPosition="right"
            className="mt-4"
            onClick={() => router.push('/users')}
          >
            查看全部
          </Button>
        </Card>

        <Card>
          <Title>金主爸爸</Title>
          <Text>按照用户的付费金额排行</Text>
          <List className="mt-4">
            {stats.users.leaderboards.by_payment_total.map(
              (item: {
                user: { id: number; name: string; avatar: string };
                paid_total: number;
              }) => (
                <ListItem key={item.user.id}>
                  <Flex justifyContent="start" className="truncate space-x-4">
                    <div className="truncate py-1">
                      <Text className="truncate">
                        <UserCell user={item.user} />
                      </Text>
                    </div>
                  </Flex>
                  <Text>￥{item.paid_total}</Text>
                </ListItem>
              )
            )}
          </List>
          <Button
            size="sm"
            variant="light"
            icon={ArrowRightIcon}
            iconPosition="right"
            className="mt-4"
            onClick={() => router.push('/payments')}
          >
            查看全部
          </Button>
        </Card>

        <Card>
          <Title>社交达人</Title>
          <Text>按照用户的邀请人数排行</Text>
          <List className="mt-4">
            {stats.users.leaderboards.by_invitation_count.map(
              (item: {
                user: { id: number; name: string; avatar: string };
                referrals_count: number;
              }) => (
                <ListItem key={item.user.id}>
                  <Flex justifyContent="start" className="truncate space-x-4">
                    <div className="truncate py-1">
                      <Text className="truncate">
                        <UserCell user={item.user} />
                      </Text>
                    </div>
                  </Flex>
                  <Text>{item.referrals_count} 人</Text>
                </ListItem>
              )
            )}
          </List>
          <Button
            size="sm"
            variant="light"
            icon={ArrowRightIcon}
            iconPosition="right"
            className="mt-4"
            onClick={() => router.push('/payments')}
          >
            查看全部
          </Button>
        </Card>
      </div>
    </div>
  );
}
