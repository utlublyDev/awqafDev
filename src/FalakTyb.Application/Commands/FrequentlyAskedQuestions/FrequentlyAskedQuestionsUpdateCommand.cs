
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class FrequentlyAskedQuestionsUpdateCommand : IRequest<FrequentlyAskedQuestions>
    {
        public FrequentlyAskedQuestions FrequentlyAskedQuestions { get; set; }
    }
}
