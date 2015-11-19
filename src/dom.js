import React from 'react';
import ReactDOM from 'react-dom';
import Baobab from 'baobab';

import BaobabFett from './components/BaobabFett';

let store = new Baobab({
    fett: {
        action: 'bounty+hunting',
        where: 'empire',
        fett: {
            action: 'bounty+hunting',
            where: 'empire',
            fett: {
                action: 'bounty+hunting',
                where: 'empire',
                fett: {
                    action: 'bounty+hunting',
                    where: 'empire',
                    fett: {
                        action: 'bounty+hunting',
                        where: 'empire',
                        fett: {
                            action: 'bounty+hunting',
                            where: 'empire',
                            fett: {
                                action: 'bounty+hunting',
                                where: 'empire'
                            }
                        }
                    }
                }
            }
        }
    }
});

ReactDOM.render(<BaobabFett store={store.get()}/>, document.querySelector('#react'));
