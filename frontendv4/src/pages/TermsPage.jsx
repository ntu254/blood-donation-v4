import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import PageContainer from '../components/layout/PageContainer';

const TermsPage = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col pt-16">
    <PageContainer className="flex-grow py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Điều khoản sử dụng</h1>
      <div className="bg-white p-6 rounded-lg shadow-md prose max-w-none mx-auto">
        <p>Đây là bản điều khoản sử dụng mẫu. Nội dung chi tiết về điều khoản sử dụng dịch vụ sẽ được cập nhật tại đây.</p>
        <p>Bằng việc tiếp tục sử dụng trang web, bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu ra.</p>
      </div>
      <div className="text-center mt-8">
        <Link to="/register">
          <Button variant="primary">Quay lại đăng ký</Button>
        </Link>
      </div>
    </PageContainer>
  </div>
);

export default TermsPage;
