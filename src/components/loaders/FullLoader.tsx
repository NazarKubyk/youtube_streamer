const FullLoader = () => {
    return (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[2px] flex items-center justify-center">
            <div className="animate-spin rounded-full border-x-4 border-green-500 size-20"></div>
        </div>
    );
};

export default FullLoader;
