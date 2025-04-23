import {
    FacebookOutlined,
    InstagramOutlined,
    TwitterOutlined,
    IeOutlined,
    YoutubeOutlined
} from '@ant-design/icons';
import { Tooltip, Button, Flex } from 'antd';


const socialLinks = [
    {
        name: 'Facebook',
        key: 'strFacebook',
        icon: <FacebookOutlined />
    },
    {
        name: 'Instagram',
        key: 'strInstagram',
        icon: <InstagramOutlined />
    },
    {
        name: 'Twitter',
        key: 'strTwitter',
        icon: <TwitterOutlined />
    },
    {
        name: 'Website',
        key: 'strWebsite',
        icon: <IeOutlined />
    },
    {
        name: 'Youtube',
        key: 'strYoutube',
        icon: <YoutubeOutlined />
    }
];


const SocialLinks = ({ league }) => (
    <Flex align="center" justify="space-evenly" style={{ width: '30%', margin: 'auto', padding: '10px 0px' }}>
        {socialLinks.map(({ name, key, icon }) => {
            const url = league[key];
            if (!url) return null;
            return (
                <Tooltip title={name} key={key}>
                    <a href={`http://${url}`} target="_blank" rel="noopener noreferrer">
                        <Button shape="circle" icon={icon} />
                    </a>
                </Tooltip>
            );
        })}
    </Flex>
);

export default SocialLinks;
