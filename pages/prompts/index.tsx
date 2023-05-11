import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title
} from '@tremor/react';
import useSWR from 'swr';

interface PromptProps {
  id: number;
  name: string;
  logo: string | null;
  description: string;
}

export default function PromptPage() {
  const { data, error, isLoading } = useSWR(`prompts`);

  if (isLoading) {
    return <div>loading</div>;
  }

  console.log(data);

  return (
    <>
      <Title>角色</Title>
      <Card className="mt-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>名称</TableHeaderCell>
              <TableHeaderCell>图标</TableHeaderCell>
              <TableHeaderCell>描述</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((prompt: PromptProps) => (
              <TableRow key={prompt.id}>
                <TableCell>{prompt.name}</TableCell>
                <TableCell>
                  <Text>{prompt.logo || '--'}</Text>
                </TableCell>
                <TableCell>
                  <Text>{prompt.description}</Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
