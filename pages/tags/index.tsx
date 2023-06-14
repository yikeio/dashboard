import TagApi, { Tag } from '@/api/tags';
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
  Title
} from '@tremor/react';
import { PlusIcon, TagIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import useSWR from 'swr';
import TagForm from '../../components/tag/form';

export default function TagPage() {
  const router = useRouter();
  const { data, error, mutate, isLoading } = useSWR(
    [`tags`, router.query.page],
    ([_, page]) => TagApi.list({ page: parseInt((page as string) || '1') })
  );
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  const handleEdit = (tag: Tag) => {
    setSelectedTag(tag);
    setShowFormModal(true);
  };

  const handleNew = () => {
    setSelectedTag(null);
    setShowFormModal(true);
  };

  const handleDelete = async (tag: Tag) => {
    if (!confirm(`确定要删除 ${tag.name} 吗？`)) {
      return;
    }

    await TagApi.delete(tag.id!);
    mutate();
    toast.success('已删除');
  };

  const handleFormSaved = (tag?: Tag) => {
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
            <TagIcon size={24} />
            <span>标签</span>
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
      <div className="rounded-lg border bg-muted px-6 py-4 mt-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell className="w-28">ID</TableHeaderCell>
              <TableHeaderCell>名称</TableHeaderCell>
              <TableHeaderCell className="text-center w-64">
                操作
              </TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((tag: Tag) => (
              <TableRow key={tag.id}>
                <TableCell>{tag.id}</TableCell>
                <TableCell onClick={() => handleEdit(tag)}>
                  <div className="flex items-center gap-2">
                    <Avatar onClick={() => handleEdit(tag)} className="h-6 w-6">
                      <AvatarFallback className="text-xl">
                        {tag.icon || ''}
                      </AvatarFallback>
                    </Avatar>
                    <div>{tag.name}</div>
                  </div>
                </TableCell>
                <TableCell className="flex items-center justify-center gap-6">
                  <Button
                    variant="link"
                    size="sm"
                    className="h-5"
                    onClick={() => handleEdit(tag)}
                  >
                    编辑
                  </Button>
                  <Button
                    variant="link"
                    size="sm"
                    className="h-5 text-red-500"
                    onClick={() => handleDelete(tag)}
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
          <TagForm
            tag={selectedTag}
            onSaved={handleFormSaved}
            onCancel={() => setShowFormModal(false)}
          ></TagForm>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
