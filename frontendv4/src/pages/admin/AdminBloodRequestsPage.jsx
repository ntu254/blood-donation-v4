import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { AlertTriangle, Clock, MapPin, Phone } from 'lucide-react';
import bloodRequestService from '../../services/bloodRequestService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import PageContainer from '../../components/layout/PageContainer';
import PageHeader from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

const AdminBloodRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const res = await bloodRequestService.getAllRequests();
            setRequests(res.data || []);
        } catch (error) {
            toast.error('Lỗi khi tải danh sách yêu cầu');
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const map = {
            PENDING: { variant: 'warning', label: 'Chờ xác minh' },
            APPROVED: { variant: 'info', label: 'Đã duyệt' },
            FULFILLED: { variant: 'success', label: 'Đã hoàn thành' },
            REJECTED: { variant: 'error', label: 'Từ chối' },
            CANCELLED: { variant: 'error', label: 'Đã hủy' }
        };
        const conf = map[status] || { variant: 'default', label: status };
        return <Badge variant={conf.variant}>{conf.label}</Badge>;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LoadingSpinner size="12" />
            </div>
        );
    }

    return (
        <PageContainer>
            <PageHeader title="Quản lý Yêu cầu cần máu" subtitle="Theo dõi các yêu cầu cần máu" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.map((req) => (
                    <Card key={req.id}>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg flex items-center">
                                    <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                                    Nhóm {req.bloodType?.bloodGroup}
                                </CardTitle>
                                {getStatusBadge(req.status)}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span>Số lượng:</span>
                                <span className="font-semibold">{req.quantityInUnits} đơn vị</span>
                            </div>
                            {req.contactPhone && (
                                <div className="flex items-center space-x-2 text-sm">
                                    <Phone className="w-4 h-4 text-gray-500" />
                                    <span>{req.contactPhone}</span>
                                </div>
                            )}
                            {req.deliveryAddress && (
                                <div className="flex items-start space-x-2 text-sm">
                                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                                    <span>{req.deliveryAddress}</span>
                                </div>
                            )}
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <Clock className="w-4 h-4" />
                                <span>{new Date(req.createdAt).toLocaleString('vi-VN')}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </PageContainer>
    );
};

export default AdminBloodRequestsPage;
