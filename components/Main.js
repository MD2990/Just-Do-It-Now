import { Box, Center, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { useEffect } from 'react';
import { FcOk, FcSportsMode, FcTodoList } from 'react-icons/fc';
import { useSnapshot } from 'valtio';
import state from '../store';
import { colors } from '../lib/constent';
import AddTodo from './AddTodo';
import ShowTodo from './ShowTodo';
import { useBreakpointValue } from '@chakra-ui/media-query';

const Boxes = ({ children }) => (
	<WrapItem>
		<Box
			p='4'
			isTruncated
			borderRadius='3xl'
			shadow='lg'
			textAlign='center'
			fontSize='3xl'
			fontFamily='sans-serif'
			fontWeight='bold'
			color='blue.500'>
			{children}
		</Box>
	</WrapItem>
);

export default function Main({ data }) {
	const Font_Size = () =>
		useBreakpointValue({ base: '3xl', lg: '9xl', md: '7xl', sm: '5xl' });
	const snap = useSnapshot(state);
	useEffect(() => {
		state.todos = data.data;
	}, [data]);

	return (
		<>
			<Center m='5%'>
				<Text
					as='span'
					fontSize={Font_Size}
					transform='rotate(-20deg)'
					fontWeight='bold'
					color={colors.green}>
					J
				</Text>
				<Text
					mb='1'
					ml='0.9%'
					letterSpacing='wider'
					fontSize={{ base: 'xs', lg: 'lg', md: 'md', sm: 'sm' }}
					fontWeight='bold'
					color={colors.green}
					textOverflow='ellipsis'
					isTruncated
					fontFamily='sans-serif'>
					UST DO I
				</Text>
				<Text
					as='span'
					fontSize={Font_Size}
					transform='rotate(20deg)'
					fontWeight='bold'
					color={colors.green}>
					T
				</Text>
			</Center>
			<AddTodo />
			<Wrap justify='space-around'>
				<Boxes>
					<FcTodoList size='8rem' />
					{snap.todos.length}
				</Boxes>

				<Boxes>
					<FcOk size='8rem' />
					{snap.todos.filter((t) => t.isDone).length}
				</Boxes>

				<Boxes>
					<FcSportsMode size='8rem' />
					{snap.todos.filter((t) => !t.isDone).length}
				</Boxes>
			</Wrap>
			<Center py={6}>
				<ShowTodo />
			</Center>
		</>
	);
}
