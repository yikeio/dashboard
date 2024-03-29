import PromptApi, { Prompt } from '@/api/prompts';
import Loading from '@/components/loading';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { pagginationHandler } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title
} from '@tremor/react';
import { PlusIcon, TerminalSquareIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import useSWR from 'swr';
import PromptForm from '../../components/prompt/form';

export default function PromptPage() {
  const router = useRouter();
  const { data, error, mutate, isLoading } = useSWR(
    [`prompts`, router.query.page],
    ([_, page]) => PromptApi.list(parseInt((page as string) || '1'))
  );
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  const handleEdit = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setShowFormModal(true);
  };

  const handleNew = () => {
    setSelectedPrompt(null);
    setShowFormModal(true);
  };

  const handleDelete = async (prompt: Prompt) => {
    if (!confirm(`确定要删除 ${prompt.name} 吗？`)) {
      return;
    }

    await PromptApi.delete(prompt.id!);
    mutate();
    toast.success('已删除');
  };

  const handleFormSaved = (prompt?: Prompt) => {
    mutate();
    setShowFormModal(false);
  };

  if (isLoading || error) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-end gap-4 leading-none">
          <Title className="leading-none flex items-center gap-2">
            <TerminalSquareIcon size={24} />
            <span>角色</span>
          </Title>
          <small className="text-muted-foreground">
            共 {data?.total || 0} 条记录
          </small>
        </div>
        <div>
          <Button
            size="sm"
            className="flex items-center justify-center gap-2"
            onClick={handleNew}
          >
            <PlusIcon size={16} /> <span>新建</span>
          </Button>
        </div>
      </div>
      <div className="rounded-lg border dark:bg-muted px-6 py-4 mt-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell className="w-28">ID</TableHeaderCell>
              <TableHeaderCell>名称</TableHeaderCell>
              <TableHeaderCell>描述</TableHeaderCell>
              <TableHeaderCell>使用次数</TableHeaderCell>
              <TableHeaderCell className="text-center">操作</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((prompt: Prompt) => (
              <TableRow key={prompt.id}>
                <TableCell>{prompt.id}</TableCell>
                <TableCell onClick={() => handleEdit(prompt)}>
                  <div className="flex items-center gap-2">
                    <Avatar
                      onClick={() => handleEdit(prompt)}
                      className="h-6 w-6"
                    >
                      <AvatarFallback className="text-xl">
                        {prompt.logo || ''}
                      </AvatarFallback>
                    </Avatar>
                    <div>{prompt.name}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Text
                    className="truncate max-w-md"
                    title={prompt.description}
                  >
                    {prompt.description}
                  </Text>
                </TableCell>
                <TableCell>{prompt.conversations_count || 0}</TableCell>
                <TableCell className="flex items-center justify-center gap-2">
                  <Button
                    variant="link"
                    size="sm"
                    className="h-5"
                    onClick={() => handleEdit(prompt)}
                  >
                    编辑
                  </Button>
                  <Button
                    variant="link"
                    size="sm"
                    className="h-5 text-red-500"
                    onClick={() => handleDelete(prompt)}
                  >
                    删除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end border-t pt-4">
          <ReactPaginate
            initialPage={data.current_page - 1}
            pageCount={data.last_page}
            onPageChange={pagginationHandler(router)}
          />
        </div>
      </div>
      <Dialog
        open={showFormModal}
        onOpenChange={(v: boolean) => setShowFormModal(v)}
      >
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>编辑</DialogTitle>
          </DialogHeader>
          <PromptForm
            prompt={selectedPrompt}
            onSaved={handleFormSaved}
            onCancel={() => setShowFormModal(false)}
          ></PromptForm>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
