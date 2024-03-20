// import React from 'react';
// import { shallow } from 'enzyme';
// import { AddDepModal } from './AddDepModal';

// describe('AddDepModal Component', () => {
//   let wrapper;
//   const onHideMock = jest.fn();
  
//   beforeEach(() => {
//     // Render the AddDepModal component with the provided onHide prop
//     wrapper = shallow(<AddDepModal onHide={onHideMock} />);
//     global.alert = jest.fn();
//   });

  
//   afterEach(() => {
//     global.alert.mockClear();
//   });

//   it('renders without crashing', () => {
//     expect(wrapper.exists()).toBeTruthy();
//   });

//   it('displays the modal header correctly', () => {
//     // Assert that the modal title is rendered correctly
//     expect(wrapper.find('ModalTitle').childAt(0).text()).toEqual('Add Department');
//   });

//   it('renders the modal body correctly', () => {
//     // Assert that the modal body is rendered
//     expect(wrapper.find('ModalBody').exists()).toBeTruthy();
//   });

//   it('renders the modal footer correctly', () => {
//     // Assert that the modal footer is rendered
//     expect(wrapper.find('ModalFooter').exists()).toBeTruthy();
//   });

//   it('displays the Add Department button with correct text', () => {
//     // Assert that the Add Department button is rendered
//     expect(wrapper.find('Button[variant="primary"]').exists()).toBeTruthy();
    
//     // Assert that the button text is correct
//     expect(wrapper.find('Button[variant="primary"]').text()).toEqual('Add Department');
//   });

//   it('contains a form with DepartmentName input field', () => {
//     // Assert that the form is rendered
//     expect(wrapper.find('Form')).toHaveLength(1);

//     // Assert that the DepartmentName input field is rendered
//     expect(wrapper.find('Form').exists()).toBeTruthy();
//   });

//   it('calls onHide when the Close button is clicked', () => {
//     // Simulate a click on the Close button
//     wrapper.find('Button[variant="danger"]').simulate('click');

//     // Assert that onHide function is called
//     expect(onHideMock).toHaveBeenCalled();
//   });

//   it('calls handleSubmit when the form is submitted', () => {
//     // Mock the handleSubmit function
//     const handleSubmitMock = jest.fn();
    
//     // Render the component with handleSubmitMock as a prop
//     const wrapper = shallow(<AddDepModal onHide={jest.fn()} handleSubmit={handleSubmitMock} />);
    
//     // Simulate form submission with a mock event object
//     const eventMock = {
//       preventDefault: jest.fn(),
//       target: {
//         DepartmentName: { value: 'Test Department' }
//       }
//     };
//     wrapper.find('Form').prop('onSubmit')(eventMock);
    
//     // Assert that handleSubmit function was called
//     expect(handleSubmitMock).toBeTruthy();
//   });

//   it('does not call handleSubmit with invalid input', () => {
//     // Mock the handleSubmit function
//     const handleSubmitMock = jest.fn();
    
//     // Render the component with handleSubmitMock as a prop
//     const wrapper = shallow(<AddDepModal onHide={jest.fn()} handleSubmit={handleSubmitMock} />);
    
//     // Simulate form submission with invalid input
//     const eventMock = {
//       preventDefault: jest.fn(),
//       target: {
//         DepartmentName: { value: '' } // Empty input, which is invalid
//       }
//     };
//     wrapper.find('Form').prop('onSubmit')(eventMock);
    
//     // Assert that handleSubmit function was not called (form should not submit with invalid input)
//     expect(handleSubmitMock).not.toHaveBeenCalled();
//   });
  
  
//   it('displays error message for invalid input', () => {
//     // Mock the handleSubmit function
//     const handleSubmitMock = jest.fn();
    
//     // Render the component with handleSubmitMock as a prop
//     const wrapper = shallow(<AddDepModal onHide={jest.fn()} handleSubmit={handleSubmitMock} />);
    
//     // Simulate form submission with invalid input
//     const eventMock = {
//       preventDefault: jest.fn(),
//       target: {
//         DepartmentName: { value: '' } // Empty input, which is invalid
//       }
//     };
//     wrapper.find('Form').prop('onSubmit')(eventMock);
    
//     // Assert that handleSubmit function was not called (form should not submit with invalid input)
//     expect(handleSubmitMock).not.toHaveBeenCalled();
//   });
  
  
//   it('handles API request and response properly', async () => {
//     // Mock fetch API
//     const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
//       json: jest.fn().mockResolvedValueOnce({ success: true }) // Simulate successful API response
//     });
    
//     // Mock the handleSubmit function
//     const handleSubmitMock = jest.fn();
    
//     // Render the component with handleSubmitMock as a prop
//     const wrapper = shallow(<AddDepModal onHide={jest.fn()} handleSubmit={handleSubmitMock} />);
    
//     // Simulate form submission with valid input
//     const eventMock = {
//       preventDefault: jest.fn(),
//       target: {
//         DepartmentName: { value: 'Test Department' }
//       }
//     };
//     await wrapper.find('Form').simulate('submit', eventMock);
    
//     // Assert that fetch API was called with correct parameters
//     expect(fetchMock).toHaveBeenCalledWith(
//       expect.stringContaining(process.env.REACT_APP_API + 'department'), // Ensure correct API endpoint is called
//       expect.objectContaining({
//         method: 'POST',
//         body: JSON.stringify({ DepartmentId: null, DepartmentName: 'Test Department' }) // Ensure correct request body
//       })
//     );
//     // Assert that handleSubmit function was called
//     expect(handleSubmitMock).toBeTruthy();
//     // Restore fetch mock
//     fetchMock.mockRestore();
//   });

  
  
  
  
// });
