import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

function Dropdown() {
    const [isChecked, setIsChecked] = React.useState(false);

    const handleChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <div>
            <Checkbox
                {...label}
                checked={isChecked}
                onChange={handleChange}
            />
        </div>
    );
}

export default Dropdown;
