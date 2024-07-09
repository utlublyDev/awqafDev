
using awqaf.Domain;
using awqaf.Dto;
using MediatR;

namespace awqaf.Application.Queries
{
    public class FrequentlyAskedQuestionsGetQuery : IRequest<FrequentlyAskedQuestions>
    {
        public long Id { get; set; }
    }
}
