
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class FrequentlyAskedQuestionsCreateCommand : IRequest<FrequentlyAskedQuestions>
    {
        public FrequentlyAskedQuestions FrequentlyAskedQuestions { get; set; }
    }
}
