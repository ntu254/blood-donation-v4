import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { MapPin, Search } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import userService from '../services/userService';

const FindDonorPage = () => {
    const [formData, setFormData] = useState({
        latitude: '',
        longitude: '',
        radius: 5,
        bloodTypeId: ''
    });
    const [bloodTypes, setBloodTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [donors, setDonors] = useState([]);

    useEffect(() => {
        userService.getBloodTypes().then(setBloodTypes).catch(() => {
            toast.error('Không thể tải danh sách nhóm máu');
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUseCurrentLocation = () => {
        if (!navigator.geolocation) {
            toast.error('Trình duyệt không hỗ trợ định vị');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setFormData(prev => ({
                    ...prev,
                    latitude: pos.coords.latitude.toFixed(6),
                    longitude: pos.coords.longitude.toFixed(6)
                }));
            },
            () => toast.error('Không thể lấy vị trí của bạn')
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                latitude: parseFloat(formData.latitude),
                longitude: parseFloat(formData.longitude),
                radius: parseFloat(formData.radius),
                bloodTypeId: formData.bloodTypeId ? parseInt(formData.bloodTypeId, 10) : null
            };
            const result = await userService.searchDonorsByLocation(payload);
            setDonors(result);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Tìm kiếm thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="container mx-auto py-12 px-4">
                <h1 className="text-3xl font-bold text-center mb-6">Tìm người hiến máu</h1>
                <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
                    <div className="flex justify-end">
                        <Button type="button" onClick={handleUseCurrentLocation} variant="secondary" size="sm">
                            Sử dụng vị trí hiện tại
                        </Button>
                    </div>
                    <InputField
                        label="Vĩ độ"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                        required
                        icon={<MapPin size={18} />}
                        hasIcon
                    />
                    <InputField
                        label="Kinh độ"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                        required
                        icon={<MapPin size={18} />}
                        hasIcon
                    />
                    <InputField
                        label="Bán kính (km)"
                        name="radius"
                        type="number"
                        value={formData.radius}
                        onChange={handleChange}
                        required
                    />
                    <div>
                        <label htmlFor="bloodTypeId" className="block text-sm font-medium text-gray-700 mb-1">Nhóm máu</label>
                        <select
                            id="bloodTypeId"
                            name="bloodTypeId"
                            value={formData.bloodTypeId}
                            onChange={handleChange}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        >
                            <option value="">-- Tất cả --</option>
                            {bloodTypes.map(bt => (
                                <option key={bt.id} value={bt.id}>{bt.bloodGroup}</option>
                            ))}
                        </select>
                    </div>
                    <Button type="submit" variant="primary" className="w-full" disabled={loading} isLoading={loading}>
                        <Search size={18} className="mr-2" /> Tìm kiếm
                    </Button>
                </form>
                <div className="mt-8">
                    {loading ? (
                        <LoadingSpinner />
                    ) : donors.length > 0 ? (
                        <ul className="space-y-4">
                            {donors.map(d => (
                                <li key={d.id} className="bg-white p-4 rounded-lg shadow border">
                                    <p className="font-semibold text-gray-800">{d.fullName}</p>
                                    <p className="text-sm text-gray-600">{d.bloodTypeDescription}</p>
                                    <p className="text-sm text-gray-600">{d.address}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-500">Không tìm thấy người hiến phù hợp.</p>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default FindDonorPage;
