import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils';
import { Component } from '../Component';

/**
 * Jest is a testing library maintained by Facebook!
 * https://jestjs.io/docs/tutorial-react 
 * it uses
 * https://testing-library.com/docs/react-testing-library/intro/ 
 */

// mocks the react router dom module
// this lets us write our own implementations for all the functionality provided by react-router-dom
jest.mock('react-router-dom')

// if you use the react dom to render and not the react testing library render function this function ensures that a new DOM is used everytime
// afterAll(cleanup);

/**
 * Basic tests to ensure everything is setup correctly
 */
describe('correct-setup', () => {
    // configures common settings
    const configure = (startPathName, resultPathName) => {
        // simulates navigation by returnign the original path once then afterwards only returning the resulting path name
        useLocation.mockReturnValueOnce({pathname: startPathName}).mockReturnValue({pathname: resultPathName})
        // jest.fn() provides an entire api to us to determine usage of the function 
        // https://jestjs.io/docs/mock-functions
        const navigate = jest.fn().mockImplementation(path => useLocation().pathname)
        useNavigate.mockImplementationOnce(() => navigate)
    }

    // ensures the mocks are setup right and do not error
    test('mocks', () => {
        configure("/", "/1")
        expect(useLocation().pathname).toBe("/")
        expect(useLocation().pathname).toBe("/1")
        const navigate = useNavigate()
        expect(navigate("Hello")).toBe("/1")
    })

    // test and name are the same thing, instead this makes the test readable
    it('renders', () => {
        configure("/1", "/2")

        // running the render function returns queries we can use to search the dom created by our test
        // Look at the data-testid attributes in each of the buttons in component.js 
        // these are unique identifiers that let us get thoe elements!
        // https://testing-library.com/docs/queries/about
        const { getByTestId } = render(
            <Component />
        )

        expect(getByTestId("Component-Button-NextScreen")).toBeInTheDocument()
        expect(getByTestId("Component-Button-Home")).toBeInTheDocument()


    })
})

/**
 * Displays how Jest can be used to query and preform tests on the dom
 */
 describe('Home Button', () => {
    // configures common settings
    const configure = (startPathName, resultPathName) => {
        useLocation.mockReturnValueOnce({pathname: startPathName}).mockReturnValue({pathname: resultPathName})
        let navigate = jest.fn().mockImplementation(path => useLocation().pathname)
        useNavigate.mockImplementationOnce(() => navigate)

        const { queryByTestId,getByTestId } = render(
            <Component />
        )

        return { queryByTestId, getByTestId }
    }

    test('home button does not render on landing page', () => {
        const {queryByTestId, getByTestId} = configure("/", "/1")
        expect(getByTestId("Component-Button-NextScreen")).toBeInTheDocument()
        expect(queryByTestId("Component-Button-Home")).toBeNull()
    })

    test('home button renders on Screen 1', () => {
        const {getByTestId} = configure("/1", "/")
        expect(getByTestId("Component-Button-NextScreen")).toBeInTheDocument()
        expect(getByTestId("Component-Button-Home")).toBeInTheDocument()
       
    })

    test('home button renders on Screen 2', () => {
        const {getByTestId} = configure("/2", "/")
        expect(getByTestId("Component-Button-NextScreen")).toBeInTheDocument()
        expect(getByTestId("Component-Button-Home")).toBeInTheDocument()
        
    })

})

/**
 * Tests clicking functionality
 * Shows how mock functions can be used to test logic and performance
 */
describe('Clicking', () => {
    const configure = (startPathName, resultPathName) => {
        useLocation.mockReturnValueOnce({pathname: startPathName}).mockReturnValue({pathname: resultPathName})
        let navigate = jest.fn().mockImplementation(path => useLocation().pathname)
        useNavigate.mockImplementationOnce(() => navigate)

        const { queryByTestId,getByTestId } = render(
            <Component />
        )

        return { queryByTestId, getByTestId, navigate }
    }

    test('Screen 0 to Screen 1', () => {
        const {getByTestId, navigate} = configure("/", "/1")

        const nextScreen = getByTestId("Component-Button-NextScreen")
        fireEvent.click(nextScreen)

        // the navigate function was only called once
        expect(navigate.mock.calls.length).toBe(1)
        // the arguments to the navigate function was /1
        expect(navigate.mock.calls[0][0]).toBe("/1")
        
    })

    test('Screen 1 to Screen 2', () => {
        const {getByTestId, navigate} = configure("/1", "/2")

        const nextScreen = getByTestId("Component-Button-NextScreen")
        fireEvent.click(nextScreen)

        expect(navigate.mock.calls.length).toBe(1)
        expect(navigate.mock.calls[0][0]).toBe("/2")
        
    })


    test('Screen 1 to Screen 2', () => {
        const {getByTestId, navigate} = configure("/2", "/1")

        const nextScreen = getByTestId("Component-Button-NextScreen")
        fireEvent.click(nextScreen)

        expect(navigate.mock.calls.length).toBe(1)
        expect(navigate.mock.calls[0][0]).toBe("/1")
        
    })

    test('Screen 2 to Screen 0', () => {
        const {getByTestId, navigate} = configure("/2", "/0")

        const homeButton = getByTestId("Component-Button-Home")
        fireEvent.click(homeButton)

        expect(navigate.mock.calls.length).toBe(1)
        expect(navigate.mock.calls[0][0]).toBe("/")
        
    })
    
    
    test('Screen 1 to Screen 0', () => {
        const {getByTestId, navigate} = configure("/1", "/0")

        const homeButton = getByTestId("Component-Button-Home")
        fireEvent.click(homeButton)

        expect(navigate.mock.calls.length).toBe(1)
        expect(navigate.mock.calls[0][0]).toBe("/")
        
    })
})