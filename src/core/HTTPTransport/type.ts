export const METHOD = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	PATCH: 'PATCH',
	DELETE: 'DELETE',
} as const;

export type MethodKeys = (typeof METHOD)[keyof typeof METHOD];

export type Options = {
	method: MethodKeys;
	timeout?: number;
	headers?: Record<string, string>;
	data?: Record<string, string | number>;
};
