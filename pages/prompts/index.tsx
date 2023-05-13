import {
  Button,
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
import Card from '../../components/card';
import Modal from '../../components/modal';
import { useState } from 'react';
import PromptForm, { Prompt } from './form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

export default function PromptPage() {
  const { data, error, isLoading } = useSWR(`prompts`);
  const [showFormModal, setShowFormModal] = useState(true);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  const handleEdit = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setShowFormModal(true);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <Title>角色</Title>
        <div className="text-gray-500">
          <small>共 {data?.total || 0} 条记录</small>
        </div>
      </div>
      <Card className="mt-6" isLoading={isLoading}>
        {!isLoading && (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>名称</TableHeaderCell>
                <TableHeaderCell>图标</TableHeaderCell>
                <TableHeaderCell>描述</TableHeaderCell>
                <TableHeaderCell>操作</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((prompt: Prompt) => (
                <TableRow key={prompt.id}>
                  <TableCell>{prompt.name}</TableCell>
                  <TableCell>
                    <Text>{prompt.logo || '--'}</Text>
                  </TableCell>
                  <TableCell>
                    <Text
                      className="truncate max-w-md"
                      title={prompt.description}
                    >
                      {prompt.description}
                    </Text>
                  </TableCell>
                  <TableCell className="flex items-center gap-6">
                    <Button variant="light" onClick={() => handleEdit(prompt)}>
                      编辑
                    </Button>
                    <Button variant="light" className="text-red-500">
                      删除
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
      <Dialog
        open={showFormModal}
        onOpenChange={(v: boolean) => setShowFormModal(v)}
      >
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>编辑</DialogTitle>
          </DialogHeader>
          <PromptForm prompt={selectedPrompt}></PromptForm>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
