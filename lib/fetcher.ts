const fetcher = (args: string) => fetch(args).then((res) => res.json());

export default fetcher;
