import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';



export const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        borderBottom: '1.5px solid #d6d3d1',
        fontFamily: 'var(--font-body)',
        color: '#1f2937',
        paddingTop: '8px',
        paddingBottom: '10px',
        transition: 'border-color 150ms ease, box-shadow 150ms ease',
        '&:focus': {
            borderColor: 'rgb(79 70 229)',
            boxShadow: '0 1px 0 0 rgb(79 70 229)',
        },
    },
    '& .MuiNativeSelect-select': {
        paddingRight: '26px', // Ensure space for the dropdown arrow
    },
    '& .MuiNativeSelect-select option': {
        minWidth: '100%',
        width: 'auto',
        overflow: 'scroll',
        whiteSpace: 'nowrap',
    },
}));
