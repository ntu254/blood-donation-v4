import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import PageContainer from '../components/layout/PageContainer';

const PrivacyPolicyPage = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col pt-16">
    <PageContainer className="flex-grow py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Chính sách bảo mật</h1>
      <div className="bg-white p-6 rounded-lg shadow-md prose max-w-none mx-auto">
        <p>Đây là bản chính sách bảo mật mẫu. Nội dung chi tiết về cách chúng tôi thu thập và xử lý dữ liệu sẽ được cập nhật tại đây.</p>
        <p>Chúng tôi cam kết bảo vệ thông tin cá nhân và quyền riêng tư của bạn.</p>
      </div>
      <div className="text-center mt-8">
        <Link to="/register">
          <Button variant="primary">Quay lại đăng ký</Button>
        </Link>
      </div>
    </PageContainer>
  </div>
);

export default PrivacyPolicyPage;
