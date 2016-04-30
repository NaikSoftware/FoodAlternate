/**
 * Created by naik on 30.04.16.
 */
import React from 'react';

import CircularProgress from 'material-ui/lib/circular-progress';

const LoadingIndicator = () => (
    <div className="loading-indicator">
        <CircularProgress size={2} />
    </div>
);

export default LoadingIndicator;