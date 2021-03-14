import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Flex, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { PostSnippetFragment, useVoteMutation } from '../gen/gql';

interface UpdootSectionProps {
	post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
	console.log(post);
	const [loadingState, setLoadingState] = useState<
		'updoot-loading' | 'downdoot-loading' | 'not-loading'
	>('not-loading');
	const [, vote] = useVoteMutation();

	return (
		<Flex direction='column' justifyContent='center' alignItems='center' mr={4}>
			<IconButton
				onClick={async () => {
					if (post.voteStatus === 1) {
						return;
					}
					setLoadingState('updoot-loading');
					await vote({
						postId: post.id,
						value: 1,
					});
					setLoadingState('not-loading');
				}}
				backgroundColor={post.voteStatus === 1 ? 'green.400' : 'gray.300'}
				isLoading={loadingState === 'updoot-loading'}
				aria-label='updoot post'
				icon={<ChevronUpIcon />}
			/>
			{post.points}
			<IconButton
				onClick={async () => {
					if (post.voteStatus === -1) {
						return;
					}
					setLoadingState('downdoot-loading');
					await vote({
						postId: post.id,
						value: -1,
					});
					setLoadingState('not-loading');
				}}
				backgroundColor={post.voteStatus === -1 ? 'red.600' : 'gray.300'}
				isLoading={loadingState === 'downdoot-loading'}
				aria-label='downdoot post'
				icon={<ChevronDownIcon />}
			/>
		</Flex>
	);
};
