
using awqaf.Domain;
using awqaf.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;

namespace awqaf.Application.Queries
{
    public class FrequentlyAskedQuestionsGetAllQuery : IRequest<IPage<FrequentlyAskedQuestions>>
    {
        public IPageable Page { get; set; }
    }
}
