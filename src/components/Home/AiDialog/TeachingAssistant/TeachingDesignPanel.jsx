// TeachingDesignPanel.js
import React from 'react';
import FormTextarea from './FormTextarea';

const TeachingDesignPanel = ({
    data = {},
    onDataChange,
    onSave,
    onExport,
    onToggle
}) => {
    const handleInputChange = (field, value) => {
        if (onDataChange) {
            onDataChange(field, value);
        }
    };

    const handleSave = () => {
        if (onSave) {
            onSave();
        }
    };

    const handleExport = () => {
        if (onExport) {
            onExport();
        }
    };

    const handleToggle = () => {
        if (onToggle) {
            onToggle();
        }
    };

    return (
        <div className="w-[400px] transition-all duration-300 hidden xl:block">
            <div className="flex-1 bg-white rounded-lg shadow-sm p-4 h-full overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-medium">教学设计</h2>
                        <button
                            className="text-gray-400 hover:text-primary transition-colors"
                            title="收起设计面板"
                            onClick={handleToggle}
                        >
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            className="px-3 py-1 text-sm text-primary border border-primary rounded-button hover:bg-primary hover:text-white transition-colors"
                            onClick={handleSave}
                        >
                            保存
                        </button>
                        <button
                            className="px-3 py-1 text-sm text-white bg-primary rounded-button hover:bg-primary/90 transition-colors"
                            onClick={handleExport}
                        >
                            导出
                        </button>
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">课程主题</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary transition-colors"
                            value={data.theme || ''}
                            onChange={(e) => handleInputChange('theme', e.target.value)}
                        />
                    </div>
                    <FormTextarea
                        label="教学目标"
                        placeholder="请输入教学目标"
                        value={data.objectives || ''}
                        onChange={(value) => handleInputChange('objectives', value)}
                    />
                    <FormTextarea
                        label="教学内容"
                        placeholder="请输入教学内容"
                        value={data.content || ''}
                        onChange={(value) => handleInputChange('content', value)}
                    />
                    <FormTextarea
                        label="教学重难点"
                        placeholder="请输入教学重难点"
                        value={data.keyPoints || ''}
                        onChange={(value) => handleInputChange('keyPoints', value)}
                    />
                    <FormTextarea
                        label="预期成果"
                        placeholder="请输入预期成果"
                        value={data.expectedOutcomes || ''}
                        onChange={(value) => handleInputChange('expectedOutcomes', value)}
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">安排课时数</label>
                        <input
                            type="number"
                            className="w-24 px-3 py-2 border rounded-md focus:ring-primary focus:border-primary transition-colors"
                            value={data.classHours || ''}
                            onChange={(e) => handleInputChange('classHours', e.target.value)}
                            min="1"
                        />
                        <span className="ml-2 text-gray-600">课时</span>
                    </div>
                    <FormTextarea
                        label="教学活动及时间安排"
                        placeholder="请输入教学活动及时间安排"
                        value={data.activities || ''}
                        onChange={(value) => handleInputChange('activities', value)}
                    />
                    <FormTextarea
                        label="课程习题"
                        placeholder="请输入习题内容"
                        value={data.exercises || ''}
                        onChange={(value) => handleInputChange('exercises', value)}
                    />
                    <FormTextarea
                        label="AI推荐资源"
                        value={data.aiResources || ''}
                        onChange={(value) => handleInputChange('aiResources', value)}
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
};

export default TeachingDesignPanel;
