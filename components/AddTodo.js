import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Center, Stack, Wrap, WrapItem } from '@chakra-ui/layout';
import React, { useRef } from 'react'
import { MdAlarmAdd } from 'react-icons/md';
import state from '../store';

export default function AddTodo () {
	const ref = useRef('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		const f = ref.current.value; // on new add get the value first
		ref.current.value = ''; // clean input value
		ref.current.focus(); // set focus
		await fetch('/api/addTodo', {
			// post request
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name: f, isDone: false }),
		});

		// get the new data from db for ui to UI refresh insanely for best user experience
		const getData = await fetch('/api/todos').then((response) =>
			response.json(),
		);

		state.todos = getData.data; // update the state with the new date
	};
	return (
    <Center mt="5%" mb="1%"  >
      <Wrap justify='center'  >
        <WrapItem >
          <form onSubmit={handleSubmit}>
            <Input
              ref={ref}
              fontSize="xl"
              rounded="full"
              textAlign="center"
              size="lg"
              isInvalid
              isRequired
              errorBorderColor="green.200"
              placeholder="Add New Todo"
            />
            <Stack>
              <Button
                fontSize="xl"
                mt="2"
                size="lg"
                rounded="full"
                type="submit"
                colorScheme="teal"
                leftIcon={<MdAlarmAdd fontSize="2.5rem" />}
              >
                Add
              </Button>
            </Stack>
          </form>
        </WrapItem>
      </Wrap>
    </Center>
  );
};
