import React from 'react';

const CreatePostModal = () => {
    // Modal visibility would be controlled by state in a real app
    return (
        <div className="modal hidden" id="modal"> {/* 'hidden' class would be toggled */}
            <div className="modal-content max-h-[80vh] overflow-y-auto bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl">
                <span className="close-button absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer text-2xl" id="closeModalButton">&times;</span>
                <div className="space-y-8">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 mb-6">创建投稿</h1>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <button className="flex items-center justify-center py-4 px-6 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 !rounded-button whitespace-nowrap bg-white">
                                <i className="fas fa-book-open mr-2 w-5 h-5 flex items-center justify-center"></i>
                                教学设计
                            </button>
                            <button className="flex items-center justify-center py-4 px-6 border-2 border-gray-200 text-gray-500 hover:border-primary hover:text-primary transition-all duration-300 !rounded-button whitespace-nowrap bg-white">
                                <i className="fas fa-archive mr-2 w-5 h-5 flex items-center justify-center"></i>
                                资源包
                            </button>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">投稿名称</label>
                            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="请输入投稿名称" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">简介</label>
                            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="一句话介绍你的投稿内容" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">详细介绍</label>
                            <textarea className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent h-32" placeholder="详细描述你的投稿内容"></textarea>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">课程封面</label>
                            <div className="relative border border-dashed border-gray-300 rounded-lg p-4 text-center">
                                <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                <div className="flex flex-col items-center space-y-2">
                                    <i className="fas fa-cloud-upload-alt text-2xl text-gray-400"></i>
                                    <span className="text-sm text-gray-500">点击或拖拽上传封面图片</span>
                                    <span className="text-xs text-gray-400">建议尺寸：1200x600px，支持 jpg、png 格式</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">上传附件</label>
                            <div className="relative">
                                <input type="file" className="hidden" accept=".md" multiple />
                                <div className="upload-area p-8 text-center cursor-pointer hover:bg-blue-50 transition-colors duration-300 !rounded-button border border-gray-200">
                                    <i className="fas fa-cloud-upload-alt text-4xl text-primary mb-4"></i>
                                    <p className="text-sm text-gray-600">点击或拖拽文件到此处上传</p>
                                    <p className="text-xs text-gray-500 mt-2">当前模式为教学设计，仅支持上传 .md 格式文件</p>
                                </div>
                                {/* File list would be rendered here based on state */}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">权限设置</label>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">私密</span>
                                <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-gray-200" role="switch" aria-checked="false">
                                    <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                                </button>
                                <span className="text-sm text-gray-600">公开</span>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4 pt-6 border-t">
                            <button className="flex items-center justify-center py-2 px-6 border border-gray-300 text-gray-700 hover:border-primary hover:text-primary transition-all duration-300 !rounded-button whitespace-nowrap bg-white">
                                <i className="fas fa-eye mr-2 w-4 h-4 flex items-center justify-center"></i>
                                预览
                            </button>
                            <button className="flex items-center justify-center py-2 px-6 bg-primary text-white hover:bg-secondary transition-all duration-300 !rounded-button whitespace-nowrap">
                                <i className="fas fa-paper-plane mr-2 w-4 h-4 flex items-center justify-center"></i>
                                提交
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePostModal;
