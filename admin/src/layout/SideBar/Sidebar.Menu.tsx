import IconAntd from '@/components/IconAntd';

export const items: any = [
    {
        label: 'Trang chủ',
        type: 'group',
        children: [
            {
                label: 'Dashboard',
                key: 'dashboard',
                icon: <IconAntd icon="DashboardOutlined" />,
                children: [
                    {
                        label: 'Khách hàng',
                        key: 'customer',
                        icon: <IconAntd icon="HomeOutlined" />,
                    },
                    {
                        label: 'CRM',
                        key: 'main/dashboard/crm',
                        icon: <IconAntd icon="HomeOutlined" />,
                    },
                    {
                        label: 'Listing',
                        key: 'main/dashboard/listing',
                        icon: <IconAntd icon="HomeOutlined" />,
                    },
                ],
            },
            {
                label: 'QL công việc',
                key: 'main/todo',
                icon: <IconAntd icon="HomeOutlined" />,
            },
            {
                label: 'Ghi chú',
                key: 'main/notes',
                icon: <IconAntd icon="HomeOutlined" />,
            },
            {
                label: 'Mạng xã hội',
                key: 'main/personal',
                icon: <IconAntd icon="HomeOutlined" />,
            },
        ],
    },
];
