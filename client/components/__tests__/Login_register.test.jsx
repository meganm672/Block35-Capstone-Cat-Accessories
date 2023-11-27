/**
 * @jest-environment jsdom
 */

import React from 'react';
// import extensions to Jest expect
import "@testing-library/jest-dom";

import {render} from '../../__tests__/utils';

import Login_register from '../Login_register';


describe("<Login_register />" , () => {
    
    it("renders the Login_register component", ()=>{
        const login_register = render(
                    <Login_register />
        );
        expect(login_register).not.toBe(null);
    })
})